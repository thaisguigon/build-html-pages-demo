import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { PageResolver } from './page.resolver';

@Module({
  providers: [PrismaService, PageResolver],
})
export class PageModule {}
