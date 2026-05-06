import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseGuards 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth 
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// ВИПРАВЛЕНІ ШЛЯХИ ЗГІДНО ТВОЄЇ СТРУКТУРИ:
import { RolesGuard } from '../common/enums/guards/roles.guard';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати список всіх товарів' })
  @ApiResponse({ status: 200, description: 'Успішне отримання списку' })
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Створити новий товар (Тільки для адміна)' })
  @ApiResponse({ status: 201, description: 'Товар успішно створено' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}