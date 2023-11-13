import {
  Body,
  Controller, Delete, Get, Param,
  Post, Put,
  UseGuards
} from "@nestjs/common";
import { JwtGuard } from '../auth/guard';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) {}

  @Post('add-product')
  async createProduct(
    @GetUser() user: User,
    @Body() dto: ProductDto,
  ) {
    const product =
      await this.productService.createProduct(
        dto,
        user,
      );
    return product;
  }
  @Get('product')
  async userFindAllProduct(
    @GetUser() user: User,
  ) {
    const product =
      await this.productService.userFindAllProduct(
        user,
      );
    return product;
  }

  @Get('product/:id')
  async findProductById(
    @GetUser() user: User,
    @Param('id') productId : string
  ) {
    const product =
      await this.productService.findProductById(
        parseInt(productId),
        user
      );
    return product;
  }

  @Delete('delete-product/:id')
  async deleteProduct(
    @GetUser() user: User,
    @Param('id') productId : string
  ) {
    const product =
      await this.productService.deleteProduct(
        parseInt(productId),
        user,
      );
    return product;
  }
  @Put('update-product/:id')
  async updateProduct(
    @GetUser() user: User,
    @Body() dto: ProductDto,
    @Param('id') productId : string
  ) {
    const product =
      await this.productService.updateProduct(
        dto,
        parseInt(productId),
        user,
      );
    return product;
  }
}