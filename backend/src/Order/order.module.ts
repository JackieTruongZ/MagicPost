import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductService } from "../product/product.service";
import { UserService } from "../user/user.service";
import { TransService } from "src/TransactionManager/trans.service";
import { HubService } from "src/HubManager/hub.service";

@Module({
  controllers : [OrderController],
  providers : [OrderService,ProductService,UserService,TransService,HubService],
})
export class OrderModule {}