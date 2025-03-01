import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageModule } from './pages/page.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['node_modules/shared/graphql/schema.graphql'],
    }),
    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
