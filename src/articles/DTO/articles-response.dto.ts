import { ApiProperty } from '@nestjs/swagger'
import { ArticleResponseDto } from './article-response.dto.js'
import { ArticlesPaginationDto } from './articles-pagination.dto.js'

export class ArticlesResponseDto {
  @ApiProperty({
    type: [ArticleResponseDto]
  })
  data: ArticleResponseDto[]

  @ApiProperty({
    type: ArticlesPaginationDto
  })
  pagination: ArticlesPaginationDto
}