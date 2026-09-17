import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateArticleDto } from './dto/create-article.dto.js'
import { UpdateArticleDto } from './dto/update-article.dto.js'
import { ArticlesQueryDto } from './dto/articles-query.dto.js'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ArticlesQueryDto) {
    const {
      page = 1,
      limit = 10,
      category,
      search
    } = query

    const skip = (page - 1) * limit

    const where = {
      ...(category && {
        category: {
          equals: category,
          mode: 'insensitive' as const
        }
      }),

      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive' as const
        }
      })
    }

    const [articles, total] = await Promise.all([
      this.prisma.articles.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          id: 'desc'
        }
      }),

      this.prisma.articles.count({
        where
      })
    ])

    return {
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
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