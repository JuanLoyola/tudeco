import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ArticlesService } from './articles.service.js'
import { CreateArticleDto } from './dto/create-article.dto.js'
import { UpdateArticleDto } from './dto/update-article.dto.js'
import { ArticlesQueryDto } from './dto/articles-query.dto.js'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(@Query() query: ArticlesQueryDto) {
    return this.articlesService.findAll(query)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(Number(id))
  }
}