import { Controller, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { HubService } from "./hub.service";


@UseGuards(JwtGuard)
@Controller('hub')
export class HubController {
  constructor(private hubService: HubService) {
  }
}