import { Module } from '@nestjs/common'
import { ArticlesModule } from '../src/articles/articles.module.js'
import { PrismaModule } from '../src/prisma/prisma.module.js'

@Module({
  imports: [
    PrismaModule,
    ArticlesModule
  ]
})
export class TestAppModule {}