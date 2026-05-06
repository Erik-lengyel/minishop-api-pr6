import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Admin User', description: 'Повне ім’я' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin@test.com', description: 'Електронна пошта' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  @IsString()
  @MinLength(6)
  password: string;
}