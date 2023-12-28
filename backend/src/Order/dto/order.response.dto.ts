import { InforOder, Order, Road } from "@prisma/client";
import { ResponseDto } from "../../Response.dto";

export class OrderResponseDto extends ResponseDto{
    setInforOrder(order: Order ,inforOder: InforOder,road: Road) {
        this.setData({order: order, inforOder: inforOder,road: road});
    }
}