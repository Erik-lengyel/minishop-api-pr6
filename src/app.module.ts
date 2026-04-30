import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module'; // 1. Імпортуємо модуль
import { User } from './users/user.entity';
import { Product } from './products/product.entity'; // 2. Імпортуємо сутність

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'nestuser',
      password: process.env.DB_PASSWORD || 'nestpass',
      database: process.env.DB_DATABASE || 'nestdb',
      entities: [User, Product], // 3. Додай Product сюди
      synchronize: true, // Це створить таблицю автоматично
    }),
    AuthModule,
    UsersModule,
    ProductsModule, // 4. Додай модуль сюди
  ],
})
export class AppModule {}