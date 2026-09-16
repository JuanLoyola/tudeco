import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateArticleDto } from './dto/create-article.dto.js'
import { UpdateArticleDto } from './dto/update-article.dto.js'

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

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    return article
  }

  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.articles.create({
      data: createArticleDto
    })
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.findOne(id)

    return this.prisma.articles.update({
      where: {
        id
      },
      data: updateArticleDto
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    return this.prisma.articles.delete({
      where: {
        id
      }
    })
  }
}