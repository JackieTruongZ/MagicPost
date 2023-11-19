import { Module } from "@nestjs/common";
import { HubController } from "./hub.controller";
import { HubService } from "./hub.service";

@Module({
  controllers : [HubController],
  providers : [HubService],
})

export class HubModule {}