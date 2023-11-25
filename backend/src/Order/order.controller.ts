import {
  Body,
  Controller, Delete, Get, Param,
  Post, Put,
  UseGuards
} from "@nestjs/common";
import { JwtGuard } from '../auth/guard';
import { OrderService } from './order.service';
import { OrderDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Post('add-order')
  async createOrder(
    @GetUser() user: User,
    @Body() dto: OrderDto,
  ) {
    const order =
      await this.orderService.createOrder(
        dto,
        user,
      );
    return order;
  }
  @Get('order')
  async findAllOrder(
    @GetUser() user: User,
  ) {
    const product =
      await this.orderService.findAllOrder(
        user,
      );
    return product;
  }

  @Get('order/:id')
  async findOrderById(
    @GetUser() user: User,
    @Param('id') productId : string
  ) {
    const product =
      await this.orderService.findOrderById(
        parseInt(productId),
        user
      );
    return product;
  }

  @Delete('delete-order/:id')
  async deleteOrder(
    @GetUser() user: User,
    @Param('id') productId : string
  ) {
    const product =
      await this.orderService.deleteOrder(
        parseInt(productId),
        user,
      );
    return product;
  }
  @Put('update-order/:id')
  async updateOrder(
    @GetUser() user: User,
    @Body() dto: OrderDto,
    @Param('id') productId : string
  ) {
    const product =
      await this.orderService.updateOrder(
        dto,
        parseInt(productId),
        user,
      );
    return product;
  }
}