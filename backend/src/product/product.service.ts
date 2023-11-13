import { ProductDto } from "./dto";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { json } from "express";

const pool = require("../db");
const queries = require("./query")
@Injectable()
export class ProductService{
  constructor(private prisma: PrismaService) {}
  async createProduct(dto: ProductDto, user: User) {
    const createProduct = await this.prisma.product.create({
      data : {
        name: dto.productName,
      }
    });
    // insert user product table
    const createUserProduct = await this.prisma.userProduct.create({
      data: {
        userId: user.id,
        productId: createProduct.id,
      }
    })
    return createProduct;
  }

  async userFindAllProduct(user: User) {
    const userId: number = user.id;
    //------------- Method 1 : use query pool pg ---------------//
    const listProduct = await pool.query(queries.userFindAllProduct(user.id));
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
  async findProductById(productId: number, user: User) {
    const userId: number = user.id;


    //------------ Method 2 : use query prisma ----------------//
    const userProduct = await this.prisma.userProduct.findUnique({
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
    if (!userProduct) {
      return "No Product Found!";
    }
    const res = userProduct.product;
    return res;
  }

  async deleteProduct(productId: number, user: User) {

  }

  async updateProduct(dto: ProductDto, productId: number, user: User) {

  }

}