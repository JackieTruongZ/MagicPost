import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { HubService } from "./hub.service";
import { GetUser } from "../auth/decorator";
import { HubDto } from "./dto/hub.dto";
import { HubResponseDto } from "./dto/hub.response.dto";
import { HubInformationDto } from "./dto/hub.information.dto";
import { HubStatusDto } from "./dto/hub.status.dto";


@UseGuards(JwtGuard)
@Controller('hub')
export class HubController {
  constructor(private hubService: HubService) {
  }
  @Get('hub/')
  async findAllHub(@GetUser('id') userId: number){
    const hub: HubResponseDto = await this.hubService.findAllHub(userId);
    return hub;
  }
  @Get('hub/:id')
  async findHubById(@GetUser('id') userId: number,
                      @Param('id') hubId: string){
    const hub: HubResponseDto = await this.hubService.findHubById(userId,hubId);
    return hub;
  }

  @Get('province/:id')
  async findHubByProvinceId(
    @GetUser('id') userId: number,
    @Param('id') provinceId: string,
  ) {
    const hub: HubResponseDto =
      await this.hubService.findHubByProvinceId(
        userId,
        provinceId,
      );
    return hub;
  }

  @Post('add-hub')
  async createHub(
    @GetUser('id') userId: number,
    @Body() dto: HubDto) {
    const hub: HubResponseDto = await this.hubService.createHub(userId,dto);
    return hub;
  }
  @Delete('delete-hub/:id')
  async deleteHub(
    @GetUser('id') userId: number,
    @Param('id') hubId: string) {
    const hub: HubResponseDto = await this.hubService.deleteHub(userId, hubId);
    return hub;
  }

  @Patch('update-status-hub/:id')
  async updateStatusHub(
    @GetUser('id') userId: number,
    @Param('id') transId: string,
    @Body() dto: HubStatusDto) {
    const hub: HubResponseDto = await this.hubService.updateStatusHub(userId, transId, dto);
    return hub;
  }

  @Patch('update-information-hub/:id')
  async updateInformationHub(
    @GetUser('id') userId: number,
    @Param('id') transId: string,
    @Body() dto: HubInformationDto) {
    const hub: HubResponseDto = await this.hubService.updateInformationHub(userId, transId, dto);
    return hub;
  }

}