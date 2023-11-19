import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransDto } from './dto';
import {
  indexingCityDistrict,
  indexingProvince,
} from '../Utils';
import { TransactionPoint } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class TransService {
  constructor(private prisma: PrismaService) {}

  async createTrans(
    userId: number,
    dto: TransDto,
  ) {
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
        return trans;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              'Credentials taken',
            );
          }
        }
        throw error;
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
        throw new Error('User not found');
      }

      const userRoleId =
        user.userRoles[0]?.roleId;

      if (!userRoleId) {
        throw new Error(
          'Role not found for the user',
        );
      }
      if (userRoleId == 5) {
        return createTransactionPoint(
          this.prisma,
        );
      } else {
        return 'You are not authorized!';
      }
    } catch (err) {
      console.log(
        'create trans get ERROR : ',
        err,
      );
    }
  }

  async deleteTrans(
    userId: number,
    transId: string,
  ) {
    //---------- Function for delete trans ---------------------//
    async function deleteTransactionPoint(
      prisma: PrismaService,
    ) {
      try {
        const trans = this.prisma.transactionPoint.delete({
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
            throw new ForbiddenException(
              'Credentials taken',
            );
          }
        }
        throw error;
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
        throw new Error('User not found');
      }

      const userRoleId =
        user.userRoles[0]?.roleId;

      if (!userRoleId) {
        throw new Error(
          'Role not found for the user',
        );
      }
      if (userRoleId == 5) {
        return delete (
          this.prisma
        );
      } else {
        return 'You are not authorized!';
      }
    } catch (err) {
      console.log(
        'delete trans get ERROR : ',
        err,
      );
    }
  }
}
