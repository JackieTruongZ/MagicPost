import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TransService } from './trans.service';
import {
  TransDto,
  TransResponseDto,
  TransStatusDto,
} from './dto';
import { GetUser } from '../auth/decorator';
import { TransInformationDto } from './dto/trans.information.dto';

@UseGuards(JwtGuard)
@Controller('trans')
export class TransController {
  constructor(
    private transService: TransService,
  ) {}

  @Get('trans/')
  async findAllTrans(
    @GetUser('id') userId: number,
  ) {
    const trans: TransResponseDto =
      await this.transService.findAllTrans(
        userId,
      );
    return trans;
  }
  @Get('trans/:id')
  async findTransById(
    @GetUser('id') userId: number,
    @Param('id') transId: string,
  ) {
    const trans: TransResponseDto =
      await this.transService.findTransById(
        userId,
        transId,
      );
    return trans;
  }

  @Get('province/:id')
  async findTransByProvinceId(
    @GetUser('id') userId: number,
    @Param('id') provinceId: string,
  ) {
    const trans: TransResponseDto =
      await this.transService.findTransByProvinceId(
        userId,
        provinceId,
      );
    return trans;
  }

  @Post('add-trans')
  async createTrans(
    @GetUser('id') userId: number,
    @Body() dto: TransDto,
  ) {
    const trans =
      await this.transService.createTrans(
        userId,
        dto,
      );
    return trans;
  }
  @Delete('delete-trans/:id')
  async deleteTrans(
    @GetUser('id') userId: number,
    @Param('id') transId: string,
  ) {
    const trans =
      await this.transService.deleteTrans(
        userId,
        transId,
      );
    return trans;
  }

  @Patch('update-status-trans/:id')
  async updateStatusTrans(
    @GetUser('id') userId: number,
    @Param('id') transId: string,
    @Body() dto: TransStatusDto,
  ) {
    const trans =
      await this.transService.updateStatusTrans(
        userId,
        transId,
        dto,
      );
    return trans;
  }

  @Patch('update-information-trans/:id')
  async updateInformationTrans(
    @GetUser('id') userId: number,
    @Param('id') transId: string,
    @Body() dto: TransInformationDto,
  ) {
    const trans =
      await this.transService.updateInformationTrans(
        userId,
        transId,
        dto,
      );
    return trans;
  }
}
