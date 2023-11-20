import {
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransDto, TransResponseDto } from "./dto";
import {
  checkUserRoleId,
  indexingCityDistrict,
  indexingProvince
} from "../Utils";
import { prisma, TransactionPoint } from "@prisma/client";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class TransService {
  constructor(private prisma: PrismaService) {}

  async createTrans(
    userId: number,
    dto: TransDto,
  ) {
    const transResponseDto = new TransResponseDto();
    //---------- Function for create trans ---------------------//
    async function createTransactionPoint(
      prisma: PrismaService,
    ) {
      const idTrans: string =
        indexingProvince(dto.province) +
        '_' +
        indexingCityDistrict(dto.cityDistrict);
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
              quanityTransaction: 0,
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
           transResponseDto.setMessage('Trans Already has existed!');
           transResponseDto.setData(null);
           return transResponseDto;
          }
        }
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('create trans get ERROR : '+ error);
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------- main method create Trans-----------///
    try {
      //--- check role-----------------------//

      const userRoleId = checkUserRoleId(this.prisma, userId);

      if (userRoleId == 5) {
        return createTransactionPoint(
          this.prisma,
        );
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('You are not authorized!');
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'create trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage('create trans get ERROR : '+ err);
      transResponseDto.setData(null);
      return transResponseDto;
    }
  }

  async deleteTrans(
    userId: number,
    transId: string,
  ) {
    const transResponseDto = new TransResponseDto();
    //---------- Function for delete trans ---------------------//
    async function deleteTransactionPoint(
      prisma: PrismaService,
    ) {
      try {
        const trans = await prisma.transactionPoint.delete({
          where: {
            id : transId
          }
        })
        return trans;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
              transResponseDto.setStatusFail();
            transResponseDto.setMessage('Trans Already has existed!');
            transResponseDto.setData(null);
            return transResponseDto;
          }
        }
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('delete trans get ERROR : '+ error);
        transResponseDto.setData(null);
        return transResponseDto;
      }
    }
    //------- main method create Trans-----------///
    try {
      //--- check role-----------------------//
      const user =
        await this.prisma.user.findUnique({
          where: { id: userId },
          include: { userRoles: true },
        });

      if (!user) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('User not found');
        transResponseDto.setData(null);
        return transResponseDto;
      }
      if (!user.userRoles) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('UserRole not found');
        transResponseDto.setData(null);
        return transResponseDto;
      }

      const userRoleId = user.userRoles[0]?.roleId;

      if (!userRoleId) {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('Role not found for the user');
        transResponseDto.setData(null);
        return transResponseDto;
      }

      if (userRoleId == 5) {
        return deleteTransactionPoint (
          this.prisma
        );
      } else {
        transResponseDto.setStatusFail();
        transResponseDto.setMessage('You are not authorized!');
        transResponseDto.setData(null);
        return transResponseDto;
      }
    } catch (err) {
      console.log(
        'delete trans get ERROR : ',
        err,
      );
      transResponseDto.setStatusFail();
      transResponseDto.setMessage('delete trans get ERROR : '+ err);
      transResponseDto.setData(null);
      return transResponseDto;
    }
  }
}
