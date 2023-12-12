import { ProductDto, ProductResponseDto } from "./dto";
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { json } from 'express';
import { publish } from "rxjs";

const pool = require('../db');
const queries = require('./query');
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // -----------for API call --------------------
  async createProduct(
    dto: ProductDto,
    user: User,
  ) {
    const productResponseDto = new ProductResponseDto();
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

  async userFindAllProduct(user: User) {
    const userId: number = user.id;
    const productResponseDto = new ProductResponseDto();

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
  async findProductById(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto = new ProductResponseDto();

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

  async deleteProduct(
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto = new ProductResponseDto();

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

  async updateProduct(
    dto: ProductDto,
    productId: number,
    user: User,
  ) {
    const userId: number = user.id;
    const productResponseDto = new ProductResponseDto();

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

  // ----- for service other API ----------------
  async createProductByOrder(
    dto: ProductDto,
  ): Promise<ProductResponseDto> {
    const productResponseDto = new ProductResponseDto();
    try {
      const createProduct =
        await this.prisma.product.create({
          data: {
            name: dto.productName,
          },
        });
      productResponseDto.setStatusOK();
      productResponseDto.setData(createProduct);
    } catch (err) {
      productResponseDto.setStatusFail();
    }
    return productResponseDto;
  }

  async deleteProductByOrder(
    productId: number,
  ) {
    const productResponseDto = new ProductResponseDto();
    try {

      //------------ Method 2 : use query prisma ----------------//
      const result = await this.prisma.product.delete({
        where: {
          id: productId,
        },
      });
      //------- Use with Method 2 ---------------------------//
      productResponseDto.setStatusOK();
      productResponseDto.setData(result)
    } catch (err) {
      console.log("delete product ERROR: ", err);
      productResponseDto.setStatusFail();
    }

    return productResponseDto;
  }

}
