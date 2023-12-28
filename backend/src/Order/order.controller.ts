import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { OrderService } from './order.service';
import {
  OrderDto,
  OrderFindDto,
  OrderStatusDto,
} from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Post('add-order')
  async createOrder(@GetUser() user: User,@Body() dto: OrderDto,) 

  {
    const order =
      await this.orderService.createOrder(
        dto,
        user,
      );
    return order;
  }

  @Post('confirm-order-from-trans')
  async confirmOrderFromTrans(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ) {
    const confirm =
      await this.orderService.confirmOrderFromTrans(
        dto.orderId,
        userId,
      );
    return confirm;
  }

  @Post('confirm-order-on-hub')
  async confirmOrderOnHub(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ) {
    const confirm =
      await this.orderService.confirmOrderOnHub(
        dto.orderId,
        userId,
      );
    return confirm;
  }

  @Post('confirm-order-from-hub')
  async confirmOrderFromHub(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ) {
    const confirm =
      await this.orderService.confirmOrderFromHub(
        dto.orderId,
        userId,
      );
    return confirm;
  }

  @Post('confirm-order-on-trans')
  async confirmOrderOnTrans(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ) {
    const confirm =
      await this.orderService.confirmOrderOnTrans(
        dto.orderId,
        userId,
      );
    return confirm;
  }

  @Post('confirm-order-success-fail')
  async confirmSuccessFail(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ) {
    const confirm =
      await this.orderService.confirmSuccessFail(
        dto.orderId,
        userId,
        dto.status,
      );
    return confirm;
  }

  @Post('confirm-order-fail-on-trans')
  async confirmOrderFailOnTrans(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ) {
    const confirm =
      await this.orderService.confirmOrderFailOnTrans(
        dto.orderId,
        userId,
      );
    return confirm;
  }

  @Get('order')
  async findAllOrder(@GetUser() user: User) {
    const order =
      await this.orderService.findAllOrder(user);
    return order;
  }

  @Get('order/:id')
  async findOrderById(
    @GetUser() user: User,
    @Param('id') orderId: string,
  ) {
    const order =
      await this.orderService.findOrderById(
        orderId,
        user,
      );
    return order;
  }

  @Post('find-order-on-trans-hub')
  async findAllOrderOnTransOrHub(
    @GetUser() user: User,
    @Body() dto: OrderFindDto,
  ) {
    const order =
      await this.orderService.findAllOrderOnTransOrHub(
        user,
        dto.pointId,
      );
    return order;
  }

  @Post('find-order-wait-on-trans')
  async findAllOrderWaitOnTrans(
    @GetUser() user: User,
    @Body() dto: OrderFindDto,
  ) {
    const order =
      await this.orderService.findAllOrderWaitOnTrans(
        user,
        dto.pointId,
      );
    return order;
  }

  @Post('find-order-from-trans-hub')
  async findAllOrderFromTransOrHub(
    @GetUser() user: User,
    @Body() dto: OrderFindDto,
  ) {
    const order =
      await this.orderService.findAllOrderFromTransOrHub(
        user,
        dto.pointId,
      );
    return order;
  }

  @Post('find-order-success-fail-return')
  async findAllOrderSuccessOrFailOrReturn(
    @GetUser() user: User,
    @Body() dto: OrderFindDto,
  ) {
    const order =
      await this.orderService.findAllOrderSuccessOrFailOrReturn(
        user,
        dto.pointId,
        dto.statusOrder,
      );
    return order;
  }

  @Delete('delete-order/:id')
  async deleteOrder(
    @GetUser() user: User,
    @Param('id') orderId: string,
  ) {
    const product =
      await this.orderService.deleteOrder(
        orderId,
        user,
      );
    return product;
  }
}
