import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { ResponseDto } from '../Response.dto';
import {
  findProvinceById,
  generateNameOfTransHub,
} from '../Utils';
import { HubPoint } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { HubDto } from './dto/hub.dto';
import { HubResponseDto } from './dto/hub.response.dto';
import { HubStatusDto } from './dto/hub.status.dto';
import { HubInformationDto } from './dto/hub.information.dto';

@Injectable()
export class HubService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}
  async createHub(userId: number, dto: HubDto) {
    let hubResponseDto = new HubResponseDto();
    //------- main method create Trans-----------///
    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return createHubPoint(this.prisma);
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log('create hub get ERROR : ', err);
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        'create hub get ERROR : ' + err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for create trans ---------------------//
    async function createHubPoint(
      prisma: PrismaService,
    ) {
      const idHub = generateNameOfTransHub(
        dto.province,
        dto.cityDistrict,
        'hub',
      );
      if (idHub == '404') {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'Name of province or city does not existed!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }

      try {
        const hub: HubPoint =
          await prisma.hubPoint.create({
            data: {
              id: idHub,
              name: dto.name,
              province: dto.province,
              cityDistrict: dto.cityDistrict,
              address: dto.address,
              numberPhone: dto.numberPhone,
              status: dto.status,
              quantityHub: 0,
            },
          });
        hubResponseDto.setStatusOK();
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            hubResponseDto.setStatusFail();
            hubResponseDto.setMessage(
              'Hub Already has existed!',
            );
            hubResponseDto.setData(null);
            return hubResponseDto;
          }
        }
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'create hub get ERROR : ' + error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //-------- END function ---------------------------------------------//
  }

  async deleteHub(userId: number, hubId: string) {
    let hubResponseDto = new HubResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const existId =
        await this.prisma.hubPoint.findUnique({
          where: { id: hubId },
        });
      if (!existId) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          `The hub with id: ${hubId} not exist !`,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return deleteTransactionPoint(
          this.prisma,
        );
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log('delete hub get ERROR : ', err);
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        'delete hub get ERROR : ' + err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function deleteTransactionPoint(
      prisma: PrismaService,
    ) {
      try {
        const hub: HubPoint =
          await prisma.hubPoint.delete({
            where: {
              id: hubId,
            },
          });
        hubResponseDto.setStatusOK();
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'delete hub get ERROR : ' + error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //------END function --------------------//
  }

  async updateStatusHub(
    userId: number,
    hubId: string,
    dto: HubStatusDto,
  ) {
    let hubResponseDto = new HubResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const existId: HubPoint =
        await this.prisma.hubPoint.findUnique({
          where: { id: hubId },
        });
      if (!existId) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          `The role with id: ${hubId} not exist !`,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return updateStatusHub(this.prisma);
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log(
        'update status trans get ERROR : ',
        err,
      );
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        'update hub trans get ERROR : ' + err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for update status trans ---------------------//
    async function updateStatusHub(
      prisma: PrismaService,
    ) {
      try {
        const hub =
          await prisma.transactionPoint.update({
            where: {
              id: hubId,
            },
            data: {
              status: dto.status,
              quantityTransaction:
                dto.quantityTransaction,
            },
          });
        hubResponseDto.setStatusOK();
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'update status hub get ERROR : ' +
            error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //------END function --------------------//
  }

  async updateInformationHub(
    userId: number,
    hubId: string,
    dto: HubInformationDto,
  ) {
    let hubResponseDto = new HubResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const existId: HubPoint =
        await this.prisma.hubPoint.findUnique({
          where: { id: hubId },
        });
      if (!existId) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          `The trans with id: ${hubId} not exist !`,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return updateInformationHub(this.prisma);
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log('update hub get ERROR : ', err);
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        'update hub get ERROR : ' + err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function updateInformationHub(
      prisma: PrismaService,
    ) {
      try {
        const hub =
          await prisma.transactionPoint.update({
            where: {
              id: hubId,
            },
            data: {
              name: dto.name,
              province: dto.province,
              cityDistrict: dto.cityDistrict,
              address: dto.address,
              numberPhone: dto.numberPhone,
            },
          });
        hubResponseDto.setStatusOK();
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            hubResponseDto.setStatusFail();
            hubResponseDto.setMessage(
              'Hub Already has existed!',
            );
            hubResponseDto.setData(null);
            return hubResponseDto;
          }
        }
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'update hub get ERROR : ' + error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //------END function --------------------//
  }

  async findAllHub(userId: number) {
    let hubResponseDto = new HubResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//
      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return findAllHub(this.prisma);
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log(
        'find all hub get ERROR : ',
        err,
      );
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        'find all hub get ERROR : ' + err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function findAllHub(
      prisma: PrismaService,
    ) {
      try {
        const hub: HubPoint[] =
          await prisma.hubPoint.findMany();
        hubResponseDto.setStatusOK();
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            hubResponseDto.setStatusFail();
            hubResponseDto.setMessage(
              'Hub Already has existed!',
            );
            hubResponseDto.setData(null);
            return hubResponseDto;
          }
        }
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'find all hub get ERROR : ' + error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //------END function --------------------//
  }

  async findHubById(
    userId: number,
    hubId: string,
  ) {
    let hubResponseDto = new HubResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//

      const existId: HubPoint =
        await this.prisma.hubPoint.findUnique({
          where: { id: hubId },
        });
      if (!existId) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          `The trans with id: ${hubId} not exist !`,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return findHubById(this.prisma);
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log(
        `find hub by id : ${hubId} get ERROR : `,
        err,
      );
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        `find hub by id : ${hubId} get ERROR : ` +
          err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for delete trans ---------------------//
    async function findHubById(
      prisma: PrismaService,
    ) {
      try {
        const hub: HubPoint =
          await prisma.hubPoint.findUnique({
            where: {
              id: hubId,
            },
          });
        hubResponseDto.setStatusOK();
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          `find hub by id : ${hubId} get ERROR : ` +
            error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //------END function --------------------//
  }

  async findHubByProvinceId(
    userId: number,
    proviceId: string,
  ) {
    let hubResponseDto = new HubResponseDto();

    //------- main method delete Trans-----------///
    try {
      //--- check role-----------------------//

      const userRoleId: number | ResponseDto =
        await this.userService.checkUserRoleId(
          userId,
        );

      if (typeof userRoleId !== 'number') {
        hubResponseDto =
          userRoleId as HubResponseDto;
        return hubResponseDto;
      }

      if (userRoleId == 5) {
        return findHubByProvinceId(this.prisma);
      } else {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          'You are not authorized!',
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    } catch (err) {
      console.log(
        `find hubs by id : ${proviceId} get ERROR : `,
        err,
      );
      hubResponseDto.setStatusFail();
      hubResponseDto.setMessage(
        `find hubs by id : ${proviceId} get ERROR : ` +
          err,
      );
      hubResponseDto.setData(null);
      return hubResponseDto;
    }
    //-------- END check role ---------------------------------------------//

    //---------- Function for find trans ---------------------//
    async function findHubByProvinceId(
      prisma: PrismaService,
    ) {
      try {
        const hub =
          await prisma.hubPoint.findMany({
            where: {
              province: proviceId,
            },
          });
        hubResponseDto.setStatusOK();
        if (!hub[0]) {
          hubResponseDto.setStatusFail();
          hubResponseDto.setMessage(
            'No trans in here !',
          );
        }
        hubResponseDto.setData(hub);
        return hubResponseDto;
      } catch (error) {
        hubResponseDto.setStatusFail();
        hubResponseDto.setMessage(
          `find hubs by id : ${proviceId} get ERROR : ` +
            error,
        );
        hubResponseDto.setData(null);
        return hubResponseDto;
      }
    }
    //------END function --------------------//
  }

  // -----------function for other API ------- //
  async checkHubForUser(
    userId: number,
    hubId: string,
  ) {
    try {
      const check =
        await this.prisma.userPoint.findMany({
          where: {
            userId: userId,
            hubId: hubId,
          },
        });
      if (!check[0]) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(
        'check hub for user get error : ' + err,
      );
      return false;
    }
  }
}
