import { ProductDto } from './dto';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { json } from 'express';

const pool = require('../db');
const queries = require('./query');
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(
    dto: ProductDto,
    user: User,
  ) {
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
    return createProduct;
  }

  async userFindAllProduct(user: User) {
    const userId: number = user.id;
    //------------- Method 1 : use query pool pg ---------------//
    const listProduct = await pool.query(
      queries.userFindAllProduct(),
      [userId],
    );
    if (listProduct.rowCount == 0) {
      return 'No Product Found!';
    }
    const res = listProduct.rows;

    //------------ Method 2 : use query prisma ----------------//
    // const userProducts = await this.prisma.userProduct.findMany({
    //   where: {
    //     userId,
    //   },
    //   include: {
    //     product: true,
    //   },
    // });
    // const res = userProducts.map((userProduct) => userProduct.product);

    return res;
  }
  async findProductById(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    //------------- Method 1 : use query pool pg ---------------//
    const product = await pool.query(
      queries.userFindProductById(),
      [userId, productId],
    );

    if (product.rowCount == 0) {
      return 'No Product Found!';
    }
    const res = product.rows;
    //------------ Method 2 : use query prisma ----------------//
    // const userProduct = await this.prisma.userProduct.findUnique({
    //   where: {
    //     userId_productId: {
    //       userId,
    //       productId,
    //     },
    //   },
    //   include: {
    //     product: true,
    //   },
    // });
    // if (!userProduct) {
    //   return "No Product Found!";
    // }
    // const res = userProduct.product;
    return res;
  }

  async deleteProduct(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    //------------- Method 1 : use query pool pg ---------------//
    const deleteProduct = await pool.query(
      queries.userDeleteProductById(),
      [userId, productId],
    );

    if (deleteProduct.rowCount == 0) {
      return 'No Product Found!';
    }
    const res = 'ok';

    //------------ Method 2 : use query prisma ----------------//
    // const deleteProduct = await this.prisma.userProduct.deleteMany({
    //   where: {
    //       userId: userId,
    //       productId: productId,
    //   },
    // });
    // if (deleteProduct.count == 0) {
    //   return "No Product Found!";
    // }
    // const res = deleteProduct;
    return res;
  }

  async updateProduct(
    dto: ProductDto,
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    //------------- Method 1 : use query pool pg ---------------//
    const updateProduct = await pool.query(
      queries.userUpdateProductById(),
      [dto.productName, userId, productId],
    );

    if (updateProduct.rowCount == 0) {
      return 'No Product Found!';
    }
    const res = updateProduct;

    // ------------ Method 2 : use query prisma ----------------//
    // const productUpdate = await this.prisma.product.update({
    //   where: {
    //     id: productId,
    //   },
    //   data: {
    //     name: dto.productName,
    //   },
    // });
    //
    // const res = productUpdate;
    return res;
  }
}
