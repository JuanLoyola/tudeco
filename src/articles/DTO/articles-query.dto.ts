import { Type } from 'class-transformer'
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator'

export class ArticlesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 10

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsIn([
    'id',
    'name',
    'category',
    'price',
    'stock',
    'create_date'
  ])
  sortBy = 'id'

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc'
}