import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { ArticlesService } from './articles.service.js'
import { CreateArticleDto } from './dto/create-article.dto.js'
import { UpdateArticleDto } from './dto/update-article.dto.js'

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'List of articles'
  })
  findAll() {
    return this.articlesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by ID' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Article ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Article found'
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found'
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(Number(id))
  }

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({
    status: 201,
    description: 'Article created'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid article data'
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an article' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Article ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Article updated'
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found'
  })
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articlesService.update(Number(id), updateArticleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Article ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Article deleted'
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found'
  })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(Number(id))
  }
}