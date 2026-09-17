import { ApiProperty } from '@nestjs/swagger'

export class ArticlesPaginationDto {
  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  total: number

  @ApiProperty()
  totalPages: number
}