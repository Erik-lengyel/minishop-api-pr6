import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/enums/guards/roles.guard';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Цей метод доступний всім (навіть без логіна)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Створювати товар може ТІЛЬКИ адмін
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: any) {
    return this.productsService.create(body);
  }
}