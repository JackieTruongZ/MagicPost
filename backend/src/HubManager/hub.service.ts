import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HubService {
  constructor(private prisma: PrismaService) {}
}