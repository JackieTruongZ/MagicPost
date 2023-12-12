import { Module } from "@nestjs/common";
import { HubController } from "./hub.controller";
import { HubService } from "./hub.service";
import { UserService } from "../user/user.service";

@Module({
  controllers : [HubController],
  providers : [HubService,UserService],
})

export class HubModule {}