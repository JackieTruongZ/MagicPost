import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import {
  CreateUserDto,
  EditUserDto,
} from './dto';
import { UserService } from './user.service';
import { AddAuthDto } from './dto/add-auth.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return this.userService.getUser(user);
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  @Post('create-user')
  createUser(
    @GetUser() user: User,
    @Body() dto: CreateUserDto,
  ) {
    return this.userService.createUser(user, dto);
  }

  @Post('add-auth')
  addAuth(
    @GetUser('id') userId: number,
    @Body() dto: AddAuthDto,
  ) {
    return this.userService.addAuth(userId, dto);
  }

  @Get('TransHubOfUser')
  async findTransForUser(
    @GetUser('id') userId: number,
  ) {
    return this.userService.findTransForUser(
      userId,
    );
  }
}
