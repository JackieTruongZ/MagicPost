import { Module } from "@nestjs/common";
import { TransController } from "./trans.controller";
import { TransService } from "./trans.service";
import { UserService } from "../user/user.service";

@Module({
    controllers : [TransController],
    providers : [TransService,UserService],
})

export class TransModule {}