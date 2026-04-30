import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Підключаємо сутність User
  providers: [UsersService],
  exports: [UsersService], // Робимо сервіс доступним для інших модулів (наприклад, для Auth)
})
export class UsersModule {}