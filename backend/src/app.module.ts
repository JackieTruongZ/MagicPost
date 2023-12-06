import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from "./Role/role.module";
import { ProductModule } from "./product/product.module";
import { TransModule } from "./TransactionManager/trans.module";
import { HubModule } from "./HubManager/hub.module";
import { OrderModule } from "./Order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    ProductModule,
    PrismaModule,
    TransModule,
    HubModule,
    OrderModule,
  ],
})
export class AppModule {}