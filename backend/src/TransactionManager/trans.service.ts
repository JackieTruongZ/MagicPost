import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  TransDto,
  TransResponseDto,
  TransStatusDto,
} from './dto';
import { generateNameOfTransHub } from '../Utils';
import { TransactionPoint } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ResponseDto } from '../Response.dto';
import { UserService } from '../user/user.service';
import { TransInformationDto } from './dto/trans.information.dto';
import { log } from 'console';

@Injectable()
export class TransService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createTrans(
    userId: number,
    dto: TransDto,
  ) {
    let transResponseDto = new TransResponseDto();
    //------- main method create Trans-----------///
    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        transResponseDto =
          userRoleId as TransResponseDto;
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return createTransactionPoint(
          this.prisma,
        );
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'You are not authorized!',
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'create trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage(
        'create trans get ERROR : ' + err,
      );
      transResponseDto.setData(null);
      return transResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for create trans ---------------------//
    async function createTransactionPoint(
      prisma: PrismaService,
    ) {
      const idTrans = generateNameOfTransHub(
        dto.province,
        dto.cityDistrict,
        'trans',
      );
      if (idTrans == '404') {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'Name of province or city does not existed!',
        );
        transResponseDto.setData(null);
      }
      try {
        const trans: TransactionPoint =
          await prisma.transactionPoint.create({
            data: {
              id: idTrans,
              name: dto.name,
              province: dto.province,
              cityDistrict: dto.cityDistrict,
              address: dto.address,
              numberPhone: dto.numberPhone,
              status: dto.status,
              quantityTransaction: 0,
            },
          });
        transResponseDto.setStatusOK();
        transResponseDto.setData(trans);
        return transResponseDto;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            transResponseDto.setStatusFail();
            transResponseDto.setMessage(
              'Trans Already has existed!',
            );
            transResponseDto.setData(null);
            return transResponseDto;
          }
        }
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'create trans get ERROR : ' + error,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //-------- END function ---------------------------------------------//
  }

  async deleteTrans(
    userId: number,
    transId: string,
  ) {
    let transResponseDto = new TransResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const existId =
        await this.prisma.transactionPoint.findUnique(
          {
            where: { id: transId },
          },
        );
      if (!existId) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          `The trans with id: ${transId} not exist !`,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        transResponseDto =
          userRoleId as TransResponseDto;
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return deleteTransactionPoint(
          this.prisma,
        );
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'You are not authorized!',
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'delete trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage(
        'delete trans get ERROR : ' + err,
      );
      transResponseDto.setData(null);
      return transResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function deleteTransactionPoint(
      prisma: PrismaService,
    ) {
      try {
        const trans =
          await prisma.transactionPoint.delete({
            where: {
              id: transId,
            },
          });
        transResponseDto.setStatusOK();
        transResponseDto.setData(trans);
        return transResponseDto;
      } catch (error) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'delete trans get ERROR : ' + error,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------END function --------------------//
  }

  async updateStatusTrans(
    userId: number,
    transId: string,
    dto: TransStatusDto,
  ) {
    let transResponseDto = new TransResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const existId =
        await this.prisma.transactionPoint.findUnique(
          {
            where: { id: transId },
          },
        );
      if (!existId) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          `The role with id: ${transId} not exist !`,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        transResponseDto =
          userRoleId as TransResponseDto;
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return updateStatusTrans(this.prisma);
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'You are not authorized!',
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'update status trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage(
        'update status trans get ERROR : ' + err,
      );
      transResponseDto.setData(null);
      return transResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for update status trans ---------------------//
    async function updateStatusTrans(
      prisma: PrismaService,
    ) {
      try {
        const trans =
          await prisma.transactionPoint.update({
            where: {
              id: transId,
            },
            data: {
              status: dto.status,
              quantityTransaction:
                dto.quantityTransaction,
            },
          });
        transResponseDto.setStatusOK();
        transResponseDto.setData(trans);
        return transResponseDto;
      } catch (error) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'update status trans get ERROR : ' +
            error,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------END function --------------------//
  }

  async updateInformationTrans(
    userId: number,
    transId: string,
    dto: TransInformationDto,
  ) {
    let transResponseDto = new TransResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const existId =
        await this.prisma.transactionPoint.findUnique(
          {
            where: { id: transId },
          },
        );
      if (!existId) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          `The trans with id: ${transId} not exist !`,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        transResponseDto =
          userRoleId as TransResponseDto;
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return updateInformationTrans(
          this.prisma,
        );
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'You are not authorized!',
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'update trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage(
        'update trans get ERROR : ' + err,
      );
      transResponseDto.setData(null);
      return transResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function updateInformationTrans(
      prisma: PrismaService,
    ) {
      try {
        const trans =
          await prisma.transactionPoint.update({
            where: {
              id: transId,
            },
            data: {
              name: dto.name,
              province: dto.province,
              cityDistrict: dto.cityDistrict,
              address: dto.address,
              numberPhone: dto.numberPhone,
            },
          });
        transResponseDto.setStatusOK();
        transResponseDto.setData(trans);
        return transResponseDto;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            transResponseDto.setStatusFail();
            transResponseDto.setMessage(
              'Trans Already has existed!',
            );
            transResponseDto.setData(null);
            return transResponseDto;
          }
        }
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'update trans get ERROR : ' + error,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------END function --------------------//
  }

  async findAllTrans(userId: number) {
    let transResponseDto = new TransResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        transResponseDto =
          userRoleId as TransResponseDto;
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return findAllTrans(this.prisma);
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'You are not authorized!',
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'find all trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage(
        'find all trans get ERROR : ' + err,
      );
      transResponseDto.setData(null);
      return transResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function findAllTrans(
      prisma: PrismaService,
    ) {
      try {
        const trans =
          await prisma.transactionPoint.findMany();
        transResponseDto.setStatusOK();
        transResponseDto.setData(trans);
        return transResponseDto;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            transResponseDto.setStatusFail();
            transResponseDto.setMessage(
              'Trans Already has existed!',
            );
            transResponseDto.setData(null);
            return transResponseDto;
          }
        }
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'find all trans get ERROR : ' + error,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------END function --------------------//
  }

  async findTransById(
    userId: number,
    transId: string,
  ) {
    let transResponseDto = new TransResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//

      const existId =
        await this.prisma.transactionPoint.findUnique(
          {
            where: { id: transId },
          },
        );
      if (!existId) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          `The trans with id: ${transId} not exist !`,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        transResponseDto =
          userRoleId as TransResponseDto;
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return findTransById(this.prisma);
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          'You are not authorized!',
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        `find trans by id : ${transId} get ERROR : `,
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage(
        `find trans by id : ${transId} get ERROR : ` +
          err,
      );
      transResponseDto.setData(null);
      return transResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function findTransById(
      prisma: PrismaService,
    ) {
      try {
        const trans =
          await prisma.transactionPoint.findUnique(
            {
              where: {
                id: transId,
              },
            },
          );
        transResponseDto.setStatusOK();
        transResponseDto.setData(trans);
        return transResponseDto;
      } catch (error) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage(
          `find trans by id : ${transId} get ERROR : ` +
            error,
        );
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------END function --------------------//
  }

  // ------ for service other api -----------//

  async checkTransForUser(
    userId: number,
    transId: string,
  ) {
    try {
      const check =
        await this.prisma.userPoint.findMany({
          where: {
            userId: userId,
            transId: transId,
          },
        });
      if (!check[0]) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(
        'check trans for user get error : ' + err,
      );
      return false;
    }
  }
}
