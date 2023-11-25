import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductService } from "../product/product.service";
import { UserService } from "../user/user.service";

@Module({
  controllers : [OrderController],
  providers : [OrderService,ProductService,UserService],
})
export class OrderModule {}