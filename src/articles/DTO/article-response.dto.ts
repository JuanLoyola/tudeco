import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ArticleResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  category: string

  @ApiPropertyOptional()
  description?: string

  @ApiPropertyOptional()
  price?: string

  @ApiProperty()
  stock: number

  @ApiProperty()
  create_date: Date
}