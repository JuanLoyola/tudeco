import { describe, expect, it } from 'vitest'
import { ArticlesController } from './articles.controller.js'

describe('ArticlesController', () => {
  it('should be defined', () => {
    const articlesService = {} as any
    const controller = new ArticlesController(articlesService)

    expect(controller).toBeDefined()
  })
})