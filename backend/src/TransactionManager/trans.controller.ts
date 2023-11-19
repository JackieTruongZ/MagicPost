import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { TransService } from "./trans.service";
import { TransDto } from "./dto/trans.dto";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('trans')
export class TransController {
  constructor(private transService: TransService) {}

  @Post('add-trans')
  async createRole(
    @GetUser('id') userId: number,
    @Body() dto: TransDto) {
    const trans = await this.transService.createTrans(userId,dto);
    return trans;
  }
  @Delete('delete-trans/:id')
  async deleteRole(
    @GetUser('id') userId: number,
    @Param('id') transId: string) {
    const trans = await this.transService.deleteTrans(userId, transId);
    return trans;
  }

}