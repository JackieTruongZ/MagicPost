import {
  OrderDto,
  OrderResponseDto,
} from './dto';
import { Road, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from '../product/dto';
import { ProductService } from '../product/product.service';
import { generateNameOfTransHub } from '../Utils';
import { ResponseDto } from '../Response.dto';
import { UserService } from '../user/user.service';
import { TransService } from 'src/TransactionManager/trans.service';
import { HubService } from 'src/HubManager/hub.service';
import { log } from 'console';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private userService: UserService,
    private transService: TransService,
    private hubService: HubService,
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
          const senderHub = `hub_${senderTransId.slice(
            -5,
          )}`;
          const receiverHub = `hub_${receiverTransId.slice(
            -5,
          )}`;
          if (senderHub === receiverHub) {
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
              status: 'wait',
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

  // ---------------------------------- FUNCTION OF STAFF ----------------------------------------//
  // ------------- confirm Order move from trans ---------//
  async confirmOrderFromTrans(
    orderId: string,
    userId: number,
  ) {
    let orderResponseDto = new OrderResponseDto();

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
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
        return confirmOrderFromTrans(
          this.prisma,
          this.transService,
          userRoleId,
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
        'confirm Order from trans get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function confirmOrderFromTrans(
      prisma: PrismaService,
      transService: TransService,
      userRoleId: number,
    ) {
      try {
        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // --------------------- update Road for order ---------------------- //
        // ------- check exist orderId ------- //

        const road = await prisma.road.findMany({
          where: {
            orderId: orderId,
          },
        });

        if (!road[0]) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            `orderId is not existed!`,
          );
          orderResponseDto.setData(null);
        }

        let nextLocationPointId: string;
        let status: string;

        const checkTransForUser: boolean =
          await transService.checkTransForUser(
            userId,
            road[0].locationPointId,
          );

        if (
          !checkTransForUser &&
          [51, 511, 512].includes(userRoleId)
        ) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            'the order not at this trans',
          );
          orderResponseDto.setData(null);
          return orderResponseDto;
        }

        if (
          road[0].roadPlan ===
          road[0].roadRealTime
        ) {
          nextLocationPointId = 'customer';
          status = 'drive';
        } else {
          nextLocationPointId = road[0].roadPlan
            .replace(
              road[0].roadRealTime + '/',
              '',
            )
            .split('/')[0];
          status = 'move';
        }
        const roadForOrder =
          await prisma.road.update({
            where: {
              id: road[0].id,
            },
            data: {
              status: status,
              nextLocationPointId:
                nextLocationPointId,
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(null);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'confirm Order from trans get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // ------------- confirm order on hub -----------------//
  async confirmOrderOnHub(
    orderId: string,
    userId: number,
  ) {
    let orderResponseDto = new OrderResponseDto();

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        orderResponseDto =
          userRoleId as OrderResponseDto;
        return orderResponseDto;
      }

      if (
        userRoleId == 5 ||
        userRoleId == 52 ||
        userRoleId == 521
      ) {
        return confirmOrderOnHub(
          this.prisma,
          this.hubService,
          userRoleId,
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
        'confirm Order on hub get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function confirmOrderOnHub(
      prisma: PrismaService,
      hubService: HubService,
      userRoleId: number,
    ) {
      try {
        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // ----------------- update Road for order ----------------- //
        // ------- check exist orderId ------- //

        const road = await prisma.road.findMany({
          where: {
            orderId: orderId,
          },
        });

        if (!road[0]) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            `orderId is not existed!`,
          );
          orderResponseDto.setData(null);
        }

        const checkHubForUser: boolean =
          await hubService.checkHubForUser(
            userId,
            road[0].locationPointId,
          );

        if (
          !checkHubForUser &&
          [52, 521].includes(userRoleId)
        ) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            'the order not at this hub',
          );
          orderResponseDto.setData(null);
          return orderResponseDto;
        }

        if (
          road[0].locationPointId ===
          road[0].nextLocationPointId
        ) {
          orderResponseDto.setStatusOK();
          orderResponseDto.setMessage(
            'double click !!!',
          );
          orderResponseDto.setData(null);
          return orderResponseDto;
        }
        const roadRealTime = `${road[0].roadRealTime}/${road[0].nextLocationPointId}`;

        const roadForOrder: Road =
          await prisma.road.update({
            where: {
              id: road[0].id,
            },
            data: {
              status: `stay`,
              locationPointId:
                road[0].nextLocationPointId,
              roadRealTime: roadRealTime,
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(null);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'confirm Order on hub get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // ------------- confirm order move from hub -----------------//
  async confirmOrderFromHub(
    orderId: string,
    userId: number,
  ) {
    let orderResponseDto = new OrderResponseDto();

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        orderResponseDto =
          userRoleId as OrderResponseDto;
        return orderResponseDto;
      }

      if (
        userRoleId == 5 ||
        userRoleId == 52 ||
        userRoleId == 521
      ) {
        return confirmOrderFromHub(
          this.prisma,
          this.hubService,
          userRoleId,
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
        'confirm Order move from hub get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function confirmOrderFromHub(
      prisma: PrismaService,
      hubService: HubService,
      userRoleId: number,
    ) {
      try {
        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // ----------------- update Road for order ----------------- //
        // ------- check exist orderId ------- //

        const road = await prisma.road.findMany({
          where: {
            orderId: orderId,
          },
        });

        if (!road[0]) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            `orderId is not existed!`,
          );
          orderResponseDto.setData(null);
        }

        const checkHubForUser: boolean =
          await hubService.checkHubForUser(
            userId,
            road[0].locationPointId,
          );

        if (
          !checkHubForUser &&
          [52, 521].includes(userRoleId)
        ) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            'the order not at this hub',
          );
          orderResponseDto.setData(null);
          return orderResponseDto;
        }

        if (
          road[0].locationPointId !==
          road[0].nextLocationPointId
        ) {
          orderResponseDto.setStatusOK();
          orderResponseDto.setMessage(
            'double click !!!',
          );
          orderResponseDto.setData(null);
          return orderResponseDto;
        }

        const nextLocationPointId: string =
          road[0].roadPlan
            .replace(
              road[0].roadRealTime + '/',
              '',
            )
            .split('/')[0];

        const roadForOrder: Road =
          await prisma.road.update({
            where: {
              id: road[0].id,
            },
            data: {
              status: `move`,
              nextLocationPointId:
                nextLocationPointId,
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(null);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'confirm Order move from hub get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // ------------- confirm Order on trans ---------//
  async confirmOrderOnTrans(
    orderId: string,
    userId: number,
  ) {
    let orderResponseDto = new OrderResponseDto();

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        orderResponseDto =
          userRoleId as OrderResponseDto;
        return orderResponseDto;
      }

      if (
        userRoleId == 5 ||
        userRoleId == 51 ||
        userRoleId == 511 ||
        userRoleId == 512
      ) {
        return confirmOrderOnTrans(
          this.prisma,
          this.transService,
          userRoleId,
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
        'confirm Order on trans get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function confirmOrderOnTrans(
      prisma: PrismaService,
      transService: TransService,
      userRoleId: number,
    ) {
      try {
        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // --------------------- update Road for order ---------------------- //
        // ------- check exist orderId ------- //

        const road = await prisma.road.findMany({
          where: {
            orderId: orderId,
          },
        });

        if (!road[0]) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            `orderId is not existed!`,
          );
          orderResponseDto.setData(null);
          return orderResponseDto;
        }
        if (road[0].status === 'wait') {
          const roadForOrder =
            await prisma.road.update({
              where: {
                id: road[0].id,
              },
              data: {
                status: `stay`,
              },
            });
        } else {
          const checkTransForUser: boolean =
            await transService.checkTransForUser(
              userId,
              road[0].nextLocationPointId,
            );

          if (
            !checkTransForUser &&
            [51, 511, 512].includes(userRoleId)
          ) {
            orderResponseDto.setStatusFail();
            orderResponseDto.setMessage(
              'the order not move to this trans',
            );
            orderResponseDto.setData(null);
            return orderResponseDto;
          }
          if (
            road[0].locationPointId ===
            road[0].nextLocationPointId
          ) {
            orderResponseDto.setStatusOK();
            orderResponseDto.setMessage(
              'double click !!!',
            );
            orderResponseDto.setData(null);
            return orderResponseDto;
          }
          const roadRealTime = `${road[0].roadRealTime}/${road[0].nextLocationPointId}`;

          const roadForOrder =
            await prisma.road.update({
              where: {
                id: road[0].id,
              },
              data: {
                status: `stay`,
                locationPointId:
                  road[0].nextLocationPointId,
                roadRealTime: roadRealTime,
              },
            });
        }

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(null);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'confirm Order on trans get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // ------------- confirm Order Success Fail ---------//
  async confirmSuccessFail(
    orderId: string,
    userId: number,
    status: string,
  ) {
    let orderResponseDto = new OrderResponseDto();

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        orderResponseDto =
          userRoleId as OrderResponseDto;
        return orderResponseDto;
      }

      if (
        userRoleId == 5 ||
        userRoleId == 51 ||
        userRoleId == 511 ||
        userRoleId == 512
      ) {
        return confirmSuccessFail(this.prisma);
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
        'confirm Order Success Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function confirmSuccessFail(
      prisma: PrismaService,
    ) {
      try {
        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // --------------------- update Road for order ---------------------- //
        // ------- check exist orderId ------- //

        const road = await prisma.road.findMany({
          where: {
            orderId: orderId,
          },
        });

        if (!road[0]) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            `orderId is not existed!`,
          );
          orderResponseDto.setData(null);
        }

        const roadForOrder =
          await prisma.road.update({
            where: {
              id: road[0].id,
            },
            data: {
              status: status,
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(null);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'confirm Order Success Fail get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // ------------- confirm Order Fail On Trans ---------//
  async confirmOrderFailOnTrans(
    orderId: string,
    userId: number,
  ) {
    let orderResponseDto = new OrderResponseDto();

    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        orderResponseDto =
          userRoleId as OrderResponseDto;
        return orderResponseDto;
      }

      if (
        userRoleId == 5 ||
        userRoleId == 51 ||
        userRoleId == 511 ||
        userRoleId == 512
      ) {
        return confirmOrderFailOnTrans(
          this.prisma,
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
        'confirm Order Success Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function confirmOrderFailOnTrans(
      prisma: PrismaService,
    ) {
      try {
        //-------- get current day -------//
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .replace(/[-:]/g, '')
          .replace(/\.\d{3}/g, '');

        // --------------------- update Road for order ---------------------- //
        // ------- check exist orderId ------- //

        const road = await prisma.road.findMany({
          where: {
            orderId: orderId,
          },
        });

        if (!road[0]) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setMessage(
            `orderId is not existed!`,
          );
          orderResponseDto.setData(null);
        }

        const roadForOrder =
          await prisma.road.update({
            where: {
              id: road[0].id,
            },
            data: {
              status: 'return',
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(null);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'confirm Order Fail On Trans get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  async findAllOrder(user: User) {
    let orderResponseDto = new OrderResponseDto();
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

      if (userRoleId == 5) {
        return findAllOrder(this.prisma);
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
        'find all Order Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function findAllOrder(
      prisma: PrismaService,
    ) {
      try {
        const order =
          await prisma.order.findMany();
        orderResponseDto.setStatusOK();
        orderResponseDto.setData(order);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'find all Order Fail get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // -------- find Order by Id -----------//
  async findOrderById(
    orderId: string,
    user: User,
  ) {
    let orderResponseDto = new OrderResponseDto();
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

      if (userRoleId == 5) {
        return findOrderById(this.prisma);
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
        'find Order by id get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    async function findOrderById(
      prisma: PrismaService,
    ) {
      try {
        const order =
          await prisma.order.findUnique({
            where: {
              id: orderId,
            },
          });
        if (!order) {
          orderResponseDto.setStatusFail();
          orderResponseDto.setData(
            'order id not existed !',
          );
          return orderResponseDto;
        }
        orderResponseDto.setStatusOK();
        orderResponseDto.setData(order);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'find Order by Id get ERROR : ' + err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
  }

  // ---- find All order on trans hub ------ //

  async findAllOrderOnTransOrHub(
    user: User,
    pointId: string,
  ) {
    let orderResponseDto = new OrderResponseDto();
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

      const userPoint =
        await this.prisma.userPoint.findMany({
          where: {
            transId: pointId,
          },
        });

      if (!userPoint) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'pointId not found !',
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }

      if (
        [5, 51, 511, 512].includes(userRoleId) &&
        pointId.startsWith('tra')
      ) {
        return findAllOrderOnTransOrHub(
          this.prisma,
        );
      } else if (
        [5, 52, 521].includes(userRoleId) &&
        pointId.startsWith('hub')
      ) {
        return findAllOrderOnTransOrHub(
          this.prisma,
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
        'confirm Order Success Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    // --------- func find all order on trans hub------//

    async function findAllOrderOnTransOrHub(
      prisma: PrismaService,
    ) {
      try {
        const orders =
          await prisma.order.findMany({
            where: {
              OrderRoad: {
                some: {
                  road: {
                    locationPointId: pointId,
                    status: 'stay',
                  },
                },
              },
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(orders);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'find all Order by id Fail get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
    // --------- END func find all order on trans hub------//
  }

  // ---- find All order wait trans ------ //

  async findAllOrderWaitOnTrans(
    user: User,
    pointId: string,
  ) {
    let orderResponseDto = new OrderResponseDto();
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

      const userPoint =
        await this.prisma.userPoint.findMany({
          where: {
            transId: pointId,
          },
        });

      if (!userPoint) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'pointId not found !',
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }

      if (
        [5, 51, 511, 512].includes(userRoleId) &&
        pointId.startsWith('tra')
      ) {
        return findAllOrderWaitOnTrans(
          this.prisma,
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
        'find all Order wait on trans Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    // --------- func find all order on trans hub------//

    async function findAllOrderWaitOnTrans(
      prisma: PrismaService,
    ) {
      try {
        const orders =
          await prisma.order.findMany({
            where: {
              OrderRoad: {
                some: {
                  road: {
                    locationPointId: pointId,
                    status: 'wait',
                  },
                },
              },
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(orders);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'find all Order wait on trans Fail get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
    // --------- END func find all order on trans hub------//
  }

  // ---- find All order from trans hub ------ //

  async findAllOrderFromTransOrHub(
    user: User,
    pointId: string,
  ) {
    let orderResponseDto = new OrderResponseDto();
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

      const userPoint =
        await this.prisma.userPoint.findMany({
          where: {
            transId: pointId,
          },
        });

      if (!userPoint) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'pointId not found !',
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }

      if (
        [5, 51, 511, 512].includes(userRoleId) &&
        pointId.startsWith('tra')
      ) {
        return findAllOrderFromTransOrHub(
          this.prisma,
        );
      } else if (
        [5, 52, 521].includes(userRoleId) &&
        pointId.startsWith('hub')
      ) {
        return findAllOrderFromTransOrHub(
          this.prisma,
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
        'confirm Order Success Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    // --------- func find all order on trans hub------//

    async function findAllOrderFromTransOrHub(
      prisma: PrismaService,
    ) {
      try {
        const orders =
          await prisma.order.findMany({
            where: {
              OrderRoad: {
                some: {
                  road: {
                    nextLocationPointId: pointId,
                    status: 'move',
                  },
                },
              },
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(orders);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'find all Order by id Fail get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
    // --------- END func find all order on trans hub------//
  }

  // ---- find All order success or fail ------ //

  async findAllOrderSuccessOrFailOrReturn(
    user: User,
    pointId: string,
    statusOrder: string,
  ) {
    let orderResponseDto = new OrderResponseDto();
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

      const userPoint =
        await this.prisma.userPoint.findMany({
          where: {
            transId: pointId,
          },
        });

      if (!userPoint) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'pointId not found !',
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }

      if (
        [5, 51, 511, 512].includes(userRoleId) &&
        pointId.startsWith('tra')
      ) {
        return findAllOrderSuccessOrFailOrReturn(
          this.prisma,
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
        'confirm Order Success Fail get ERROR : ',
        err,
      );
      orderResponseDto.setStatusFail();
      orderResponseDto.setData(null);
      return orderResponseDto;
    }

    // ---------- END check role -----------//

    // --------- func find all order on trans hub------//

    async function findAllOrderSuccessOrFailOrReturn(
      prisma: PrismaService,
    ) {
      try {
        const orders =
          await prisma.order.findMany({
            where: {
              OrderRoad: {
                some: {
                  road: {
                    nextLocationPointId: pointId,
                    status: statusOrder,
                  },
                },
              },
            },
          });

        orderResponseDto.setStatusOK();
        orderResponseDto.setData(orders);
        return orderResponseDto;
      } catch (err) {
        orderResponseDto.setStatusFail();
        orderResponseDto.setMessage(
          'find all Order by id Fail get ERROR : ' +
            err,
        );
        orderResponseDto.setData(null);
        return orderResponseDto;
      }
    }
    // --------- END func find all order on trans hub------//
  }

  async deleteOrder(
    orderId: string,
    user: User,
  ) {}
}
