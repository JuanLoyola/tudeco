import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ArticlesService } from './articles.service.js'
import { CreateArticleDto } from './dto/create-article.dto.js'
import { UpdateArticleDto } from './dto/update-article.dto.js'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(Number(id))
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articlesService.update(Number(id), updateArticleDto)
  }
}