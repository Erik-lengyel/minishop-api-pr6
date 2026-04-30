import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard) // Дозволяє вхід тільки з токеном
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Поверне дані з твого токена
  }
}