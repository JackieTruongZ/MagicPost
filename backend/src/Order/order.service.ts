import { OrderDto, OrderResponseDto } from "./dto";
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { json } from 'express';
import { publish } from "rxjs";

const pool = require('../db');
const queries = require('./query');
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async createOrder(
    dto: OrderDto,
    user: User,
  ) {
    const productResponseDto = new OrderResponseDto();
    console.log("check 1");
    try {
      const createProduct =
        await this.prisma.product.create({
          data: {
            name: dto.productName,
          },
        });
      // insert user product table
      const createUserProduct =
        await this.prisma.userProduct.create({
          data: {
            userId: user.id,
            productId: createProduct.id,
          },
        });
      productResponseDto.setStatusOK();
      productResponseDto.setData(createProduct);
    } catch (err) {
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }

  async findAllOrder(user: User) {
    const userId: number = user.id;
    const productResponseDto = new OrderResponseDto();

    try {

      //------------- Method 1 : use query pool pg ---------------//
      // const result = await pool.query(queries.userFindAllProduct(), [userId]);

      //------------ Method 2 : use query prisma ----------------//
      const result = await this.prisma.userProduct.findMany({
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
      productResponseDto.setData(result)
    } catch (err) {
      console.log("find all products ERROR: ", err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }
  async findOrderById(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto = new OrderResponseDto();

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
      const result = await this.prisma.userProduct.findUnique({
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
        productResponseDto.setMessage("Product By Id Not Found!");
      }
      else {
        productResponseDto.setStatusOK();
        productResponseDto.setMessage("Product By Id Found Successfully!")
      }

      //------- Use with Method 1 ---------------------------//
      // productResponseDto.setData(result.rows);

      //------- Use with Method 2 ---------------------------//
      productResponseDto.setData(result)
    } catch (err) {
      console.log("find product ERROR: ", err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }

  async deleteOrder(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto = new OrderResponseDto();

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
      const result = await this.prisma.userProduct.deleteMany({
        where: {
            userId: userId,
            productId: productId,
        },
      });
      if (result.count == 0) {
        productResponseDto.setStatusFail();
        productResponseDto.setMessage("Product By Id Not Found!");
      }
      else {
        productResponseDto.setStatusOK();
        productResponseDto.setMessage("Product By Id Delete Successfully!")
      }
      //------- Use with Method 1 ---------------------------//
      // productResponseDto.setData(result.rows);

      //------- Use with Method 2 ---------------------------//
      productResponseDto.setData(result)
    } catch (err) {
      console.log("delete product ERROR: ", err);
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
    const productResponseDto = new OrderResponseDto();

    try {
      //------------- Method 1 : use query pool pg ---------------//
      const result = await pool.query(queries.userUpdateProductById(), [dto.productName, userId, productId]);
      if (result.rowCount == 0) {
        productResponseDto.setStatusFail();
        productResponseDto.setMessage("Product By Id Not Found!");
      }
      else {
        productResponseDto.setStatusOK();
        productResponseDto.setMessage("Product By Id Update Successfully!")
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
      console.log("update product ERROR: ", err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;

  }
}
