import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthDto,
  AuthSigninDto,
  AuthSignupDto,
  AuthResponseDto,
} from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { ResponseDto } from 'src/Response.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthSignupDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    const authResponseDto = new AuthResponseDto();
    // save the new user in the db
    try {
      const user: User =
        await this.prisma.user.create({
          data: {
            email: dto.email,
            hash,
            username: dto.username,
            password: dto.password,
          },
        });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          authResponseDto.setStatusFail();
          authResponseDto.setMessage(
            'Credentials taken',
          );
          authResponseDto.setData(null);
          return authResponseDto;
        }
      }
      authResponseDto.setStatusFail();
      authResponseDto.setMessage(error);
      authResponseDto.setData(null);
      return authResponseDto;
    }
  }

  async signin(dto: AuthSigninDto) {
    // find the user by email

    const authResponseDto = new AuthResponseDto();
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user) {
      authResponseDto.setStatusFail();
      authResponseDto.setMessage(
        'Sorry wrong email !',
      );
      authResponseDto.setData(null);
      return authResponseDto;
    }

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches) {
      authResponseDto.setStatusFail();
      authResponseDto.setMessage(
        'Sorry wrong password !',
      );
      authResponseDto.setData(null);
      return authResponseDto;
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<AuthResponseDto> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '60m',
        secret: secret,
      },
    );

    const authResponseDto: AuthResponseDto =
      new AuthResponseDto();
    authResponseDto.setStatusOK();
    authResponseDto.setAccessToken(token);
    return authResponseDto;
  }
}
