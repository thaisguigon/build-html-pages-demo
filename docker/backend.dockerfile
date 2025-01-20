# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=23.4.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

COPY shared shared

WORKDIR /usr/src/app/backend

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=backend/package.json,target=package.json \
    --mount=type=bind,source=backend/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps AS build

WORKDIR /usr/src/app/backend

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=backend/package.json,target=package.json \
    --mount=type=bind,source=backend/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

WORKDIR /usr/src/app

# Copy the source files into the image.
COPY backend ./backend
COPY shared ./shared

WORKDIR /usr/src/app/backend

COPY backend/.env.docker ./.env

# Run the build script.
RUN npm run build && npx prisma db push

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS final

WORKDIR /usr/src/app

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY backend/package.json ./backend/package.json

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/backend/node_modules ./backend/node_modules
COPY --from=build /usr/src/app/backend/dist ./backend/dist
COPY --from=build /usr/src/app/backend/.env ./backend/.env
COPY --from=build /usr/src/app/backend/node_modules/.prisma/client ./backend/node_modules/.prisma/client
COPY --from=build /usr/src/app/shared/graphql/schema.graphql ./shared/graphql/schema.graphql


# Expose the port that the application listens on.
EXPOSE 3001

WORKDIR /usr/src/app/backend

# Run the application.
CMD ["npm", "run", "start:prod"]
