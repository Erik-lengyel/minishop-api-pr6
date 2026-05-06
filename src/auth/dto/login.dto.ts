import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    example: 'admin@test.com', 
    description: 'Електронна пошта користувача' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Пароль (мінімум 6 символів)' 
  })
  @IsString()
  @MinLength(6)
  password: string;
}