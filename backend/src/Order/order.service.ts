import {
  OrderDto,
  OrderResponseDto,
} from './dto';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from '../product/dto';
import { ProductService } from '../product/product.service';
import { generateNameOfTransHub } from '../Utils';
import { ResponseDto } from '../Response.dto';
import { UserService } from '../user/user.service';

const pool = require('../db');
const queries = require('./query');
@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private userService: UserService,
  ) {}
  async createOrder(dto: OrderDto, user: User) {
    let orderResponseDto = new OrderResponseDto();
    const productDto = new ProductDto();
    productDto.productName = dto.productName;
    productDto.mass = dto.massItem;

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          user.id,
        );

      if (typeof userRoleId !== 'number') {
        orderResponseDto =
          userRoleId as OrderResponseDto;
        return orderResponseDto;
      }

      if (
        userRoleId == 5 ||
        userRoleId == 51 ||
        userRoleId == 511
      ) {
        return createOrder(
          this.prisma,
          this.productService,
        );
      } else {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'You are not authorized!',
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    } catch (err) {
      console.log(
        'create order get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setMessage(
        'create order get ERROR : ' + err,
      );
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function createOrder(
      prisma: PrismaService,
      productService: ProductService,
    ) {
      try {
        // ----create product -----------//
        const product =
          await productService.createProductByOrder(
            productDto,
          );

        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // -------- find senderTrans ----------------//
        const senderTransId =
          generateNameOfTransHub(
            dto.senderProvince,
            dto.senderCity,
            'trans',
          );

        // -------- find receiverTrans ----------------//
        const receiverTransId =
          generateNameOfTransHub(
            dto.receiverProvince,
            dto.receiverCity,
            'trans',
          );

        // ----- generate orderId format : date + trans of sender and receiver
        const orderId = `${formattedDate}_${senderTransId}_${receiverTransId}`;

        // ------- create order ---------------//
        const order = await prisma.order.create({
          data: {
            id: orderId,
            userId: user.id,
          },
        });

        // ------- create orderItem -------------//
        const orderItem =
          await prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: product.Data.id,
              quantity: dto.quantity,
              description: dto.descriptionItem,
              mass: dto.massItem,
            },
          });

        // --------- create infor order --------//
        const inforOrder =
          await prisma.inforOder.create({
            data: {
              id: product.Data.id,
              orderId: order.id,
              description: dto.description,
              senderName: dto.senderName,
              senderNumber: dto.senderNumber,
              senderAddress: dto.senderAddress,
              senderPostCode: dto.senderPostCode,
              receiverName: dto.receiverName,
              receiverNumber: dto.receiverNumber,
              receiverAddress:
                dto.receiverAddress,
              receiverPostCode:
                dto.receiverPostCode,
              mass: dto.massOrder,
              typeGoods: dto.typeGoods,
              baseFee: 0,
              additionalFee: 0,
              VAT: 0,
              cost: 0,
              Othercharge: 0,
              reveiverCOD: 0,
              reveicerOthercharge: 0,
            },
          });

        // ---- create Road for order ------ //
        const roadPlan = (
          senderTransId: string,
          receiverTransId: string,
        ) => {
          const senderHub = `hub_${senderTransId.slice(-5)}`
          const receiverHub = `hub_${receiverTransId.slice(-5)}`
          if (senderHub == receiverHub) {
            return `${senderTransId}/${senderHub}/${receiverTransId}`;
          } else {
            return `${senderTransId}/${senderHub}/${receiverHub}/${receiverTransId}`;
          }
        };
        const roadForOrder =
          await prisma.road.create({
            data: {
              orderId: order.id,
              roadPlan: roadPlan(
                senderTransId,
                receiverTransId,
              ),
              roadRealTime: senderTransId,
              locationPointId: senderTransId,
              nextLocationPointId: '',
              status: 'stay',
            },
          });

        // ---- create Order Road for order ------ //

        const orderRoad =
          await prisma.orderRoad.create({
            data: {
              orderId: order.id,
              roadId: roadForOrder.id,
            },
          });
        orderResponseDto.setStatusOK();
        orderResponseDto.setData(orderRoad);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'create order get error: ' + err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  async findAllOrder(user: User) {
    const userId: number = user.id;
    const productResponseDto =
      new OrderResponseDto();

    try {
      //------------- Method 1 : use query pool pg ---------------//
      // const result = await pool.query(queries.userFindAllProduct(), [userId]);

      //------------ Method 2 : use query prisma ----------------//
      const result =
        await this.prisma.userProduct.findMany({
          where: {
            userId,
          },
          include: {
            product: true,
          },
        });

      productResponseDto.setStatusOK();

      //------- Use with Method 1 ---------------------------//
      // productResponseDto.setData(result.rows);

      //------- Use with Method 2 ---------------------------//
      productResponseDto.setData(result);
    } catch (err) {
      console.log(
        'find all products ERROR: ',
        err,
      );
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }
  async findOrderById(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto =
      new OrderResponseDto();

    try {
      //------------- Method 1 : use query pool pg ---------------//
      // const result = await pool.query(queries.userFindProductById(), [userId, productId],);
      // if (result.rowCount == 0) {
      //   productResponseDto.setStatusFail();
      //   productResponseDto.setMessage("Product By Id Not Found!");
      // }
      // else {
      //   productResponseDto.setStatusOK();
      //   productResponseDto.setMessage("Product By Id Found Successfully!")
      // }

      //------------ Method 2 : use query prisma ----------------//
      const result =
        await this.prisma.userProduct.findUnique({
          where: {
            userId_productId: {
              userId,
              productId,
            },
          },
          include: {
            product: true,
          },
        });
      if (result == null) {
        productResponseDto.setStatusFail();
        productResponseDto.setMessage(
          'Product By Id Not Found!',
        );
      } else {
        productResponseDto.setStatusOK();
        productResponseDto.setMessage(
          'Product By Id Found Successfully!',
        );
      }

      //------- Use with Method 1 ---------------------------//
      // productResponseDto.setData(result.rows);

      //------- Use with Method 2 ---------------------------//
      productResponseDto.setData(result);
    } catch (err) {
      console.log('find product ERROR: ', err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }

  async deleteOrder(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto =
      new OrderResponseDto();

    try {
      //------------- Method 1 : use query pool pg ---------------//
      // const result = await pool.query(queries.userDeleteProductById(), [userId, productId]);
      // if (result.rowCount == 0) {
      //   productResponseDto.setStatusFail();
      //   productResponseDto.setMessage("Product By Id Not Found!");
      // }
      // else {
      //   productResponseDto.setStatusOK();
      //   productResponseDto.setMessage("Product By Id Delete Successfully!")
      // }

      //------------ Method 2 : use query prisma ----------------//
      const result =
        await this.prisma.userProduct.deleteMany({
          where: {
            userId: userId,
            productId: productId,
          },
        });
      if (result.count == 0) {
        productResponseDto.setStatusFail();
        productResponseDto.setMessage(
          'Product By Id Not Found!',
        );
      } else {
        productResponseDto.setStatusOK();
        productResponseDto.setMessage(
          'Product By Id Delete Successfully!',
        );
      }
      //------- Use with Method 1 ---------------------------//
      // productResponseDto.setData(result.rows);

      //------- Use with Method 2 ---------------------------//
      productResponseDto.setData(result);
    } catch (err) {
      console.log('delete product ERROR: ', err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }

  async updateOrder(
    dto: OrderDto,
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto =
      new OrderResponseDto();

    try {
      //------------- Method 1 : use query pool pg ---------------//
      const result = await pool.query(
        queries.userUpdateProductById(),
        [dto.productName, userId, productId],
      );
      if (result.rowCount == 0) {
        productResponseDto.setStatusFail();
        productResponseDto.setMessage(
          'Product By Id Not Found!',
        );
      } else {
        productResponseDto.setStatusOK();
        productResponseDto.setMessage(
          'Product By Id Update Successfully!',
        );
      }

      // ------------ Method 2 : use query prisma ----------------//
      // const result = await this.prisma.userProduct.updateMany({
      //   where: {
      //       userId: userId,
      //       productId: productId
      //   },
      //   data: {
      //     productId: {
      //       update: {
      //         name: dto.productName,
      //       },
      //     },
      //   },
      //   include: {
      //     product: true
      //   }
      // });

      //------- Use with Method 1 ---------------------------//
      productResponseDto.setData(result.rowCount);

      //------- Use with Method 2 ---------------------------//
      // productResponseDto.setData(result)
    } catch (err) {
      console.log('update product ERROR: ', err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }
}
