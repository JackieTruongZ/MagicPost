import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  EditUserDto,
} from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { User } from "@prisma/client";
const generalPassword = require('../password');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async createUser(
    user: User,
    dto: CreateUserDto,
  ) {
    const userId = user.id;

    //---------- Function for create user ---------------------//
    async function createAccountForALlRole (
      dto: CreateUserDto,
      prisma,
    ) {
      // generate the password hash
      const hash = await argon.hash(generalPassword.generalPassword);

      // save the new user in the db
      try {

        const user: User = await prisma.user.create({
          data: {
            email: dto.email,
            hash,
            username: dto.username,
            password: generalPassword.generalPassword,
          },
        });

        const createUserRole = await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: dto.roleId,
          },
        })

        return "ok";
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
    };

    // const createAccountForBranchManager = (
    //   dto: CreateUserDto,
    // ) => {};
    //
    // const createAccountForHubManager = (
    //   dto: CreateUserDto,
    // ) => {};hello

    try {

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

      if (
        userRoleId == 511 ||
        userRoleId == 512 ||
        userRoleId == 521 ||
        userRoleId == 7
      )
        return 'you are not authentication!';

      if (userRoleId == 5) {

        return createAccountForALlRole(dto, this.prisma);
      }
      if (userRoleId == 51) {
        if (
          dto.roleId == 511 ||
          dto.roleId == 512
        ) {
          return createAccountForALlRole(dto,this.prisma);
        } else {
          return 'You are not authorized!';
        }
      }
      if (userRoleId == 52) {
        if (dto.roleId == 521) {
          return createAccountForALlRole(dto, this.prisma);
        } else {
          return 'You are not authorized!';
        }
      }
    } catch (err) {
      console.log(
        'create user get ERROR : ',
        err,
      );
    }
  }
}
