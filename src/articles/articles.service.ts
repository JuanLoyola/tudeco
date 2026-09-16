import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.articles.findMany()
  }

  async findOne(id: number) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id
      }
    })

    if (!article) throw new NotFoundException(`Article with id ${id} not found`)

    return article
  }
}