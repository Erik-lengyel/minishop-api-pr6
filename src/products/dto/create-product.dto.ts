import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsInt, Min, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'MacBook Pro 16', description: 'Назва товару' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 2499.99, description: 'Ціна' })
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiPropertyOptional({ example: 'M3 Max, 32GB RAM', description: 'Опис товару' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 5, description: 'Кількість на складі' })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}