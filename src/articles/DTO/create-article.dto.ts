import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min
} from 'class-validator'

export class CreateArticleDto {
  @ApiProperty({
    example: 'Lámpara Ondulada',
    description: 'Article name'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string

  @ApiProperty({
    example: 'Lámpara',
    description: 'Article category'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string

  @ApiPropertyOptional({
    example: 'Diseño ondulado impreso en 3D'
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: 2500,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number

  @ApiPropertyOptional({
    example: 10,
    minimum: 0
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number
}