import { Module } from "@nestjs/common";
import { TransController } from "./trans.controller";
import { TransService } from "./trans.service";

@Module({
    controllers : [TransController],
    providers : [TransService],
})

export class TransModule {}