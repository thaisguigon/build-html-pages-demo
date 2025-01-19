import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Page } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Resolver('Page')
export class PageResolver {
  constructor(private prisma: PrismaService) {}

  @Query()
  async pages() {
    return this.prisma.page.findMany();
  }

  @Query()
  async page(@Args('id') id: string) {
    return this.prisma.page.findUnique({ where: { id } });
  }

  @ResolveField('blocks')
  async blocks(@Parent() page: Page) {
    return this.prisma.block.findMany({ where: { pageId: page.id } });
  }

  @Mutation()
  async createPage(@Args('title') title: string) {
    return this.prisma.page.create({ data: { title } });
  }

  @Mutation()
  async updatePage(
    @Args('input')
    input: {
      id: string;
      title?: string;
      styles?: string;
      blocks?: {
        type: string;
        value: string;
      }[];
    },
  ) {
    await this.prisma.block.deleteMany({ where: { pageId: input.id } });

    return this.prisma.page.update({
      where: { id: input.id },
      data: {
        title: input.title,
        styles: input.styles,
        blocks: {
          create: input.blocks,
        },
      },
    });
  }
}
