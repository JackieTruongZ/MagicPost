import {
  Body,
  Controller,
  Get,
  Param,
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
  GetAllUsers,
  AddAuthDto
} from './dto';
import { UserService } from './user.service';

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

  @Post('get-all-users')
  getAllUsers(
    @GetUser() user: User,
    @Body() dto: GetAllUsers,
  ) {
    return this.userService.getAllUsers(user, dto);
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

  @Get('user-on-point/:id')
  async findUserOnPoint(
    @GetUser('id') userId: number,
    @Param('id') pointId: string,
  ) {
    return this.userService.findUserOnPoint(
      userId,pointId
    );
  }
}
