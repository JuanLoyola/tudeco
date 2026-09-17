import { NotFoundException } from '@nestjs/common'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArticlesService } from './articles.service.js'

describe('ArticlesService', () => {
  let service: ArticlesService

  const prismaMock = {
    articles: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()

    service = new ArticlesService(prismaMock as any)
  })

  describe('findAll', () => {
    it('should return all articles', async () => {
      const articles = [
        {
          id: 1,
          name: 'Lámpara Ondulada',
          category: 'Lámpara',
          price: 2500,
          stock: 10
        }
      ]

      prismaMock.articles.findMany.mockResolvedValue(articles)

      const result = await service.findAll()

      expect(result).toEqual(articles)
      expect(prismaMock.articles.findMany).toHaveBeenCalledTimes(1)
    })
  })

  describe('findOne', () => {
    it('should return an article when it exists', async () => {
      const article = {
        id: 1,
        name: 'Lámpara Ondulada',
        category: 'Lámpara',
        price: 2500,
        stock: 10
      }

      prismaMock.articles.findUnique.mockResolvedValue(article)

      const result = await service.findOne(1)

      expect(result).toEqual(article)

      expect(prismaMock.articles.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      })
    })

    it('should throw NotFoundException when article does not exist', async () => {
      prismaMock.articles.findUnique.mockResolvedValue(null)

      await expect(service.findOne(999))
        .rejects
        .toThrow(NotFoundException)
    })
  })

  describe('create', () => {
    it('should create an article', async () => {
      const dto = {
        name: 'Lámpara Espiral',
        category: 'Lámpara',
        description: 'Diseño espiral',
        price: 2800,
        stock: 10
      }

      const createdArticle = {
        id: 5,
        ...dto
      }

      prismaMock.articles.create.mockResolvedValue(createdArticle)

      const result = await service.create(dto)

      expect(result).toEqual(createdArticle)

      expect(prismaMock.articles.create).toHaveBeenCalledWith({
        data: dto
      })
    })
  })

  describe('update', () => {
    it('should update an existing article', async () => {
      const dto = {
        price: 3500,
        stock: 7
      }

      const article = {
        id: 1,
        name: 'Lámpara Ondulada'
      }

      const updatedArticle = {
        ...article,
        ...dto
      }

      prismaMock.articles.findUnique.mockResolvedValue(article)
      prismaMock.articles.update.mockResolvedValue(updatedArticle)

      const result = await service.update(1, dto)

      expect(result).toEqual(updatedArticle)

      expect(prismaMock.articles.update).toHaveBeenCalledWith({
        where: {
          id: 1
        },
        data: dto
      })
    })

    it('should throw NotFoundException when updating a non-existing article', async () => {
      prismaMock.articles.findUnique.mockResolvedValue(null)

      await expect(
        service.update(999, {
          price: 3000
        })
      ).rejects.toThrow(NotFoundException)

      expect(prismaMock.articles.update).not.toHaveBeenCalled()
    })
  })

  describe('remove', () => {
    it('should delete an existing article', async () => {
      const article = {
        id: 1,
        name: 'Lámpara Ondulada'
      }

      prismaMock.articles.findUnique.mockResolvedValue(article)
      prismaMock.articles.delete.mockResolvedValue(article)

      const result = await service.remove(1)

      expect(result).toEqual(article)

      expect(prismaMock.articles.delete).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      })
    })

    it('should throw NotFoundException when deleting a non-existing article', async () => {
      prismaMock.articles.findUnique.mockResolvedValue(null)

      await expect(service.remove(999))
        .rejects
        .toThrow(NotFoundException)

      expect(prismaMock.articles.delete).not.toHaveBeenCalled()
    })
  })
})