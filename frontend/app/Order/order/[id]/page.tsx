'use client'
import { BaseService } from "@/app/service/BaseService";
import { OrderAllInfor } from "@/public/utils/interface";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import QRCode from "react-qr-code";
import React, { useEffect, useState } from "react";
import { pdfFromReact } from "generate-pdf-from-react-html";
import "./style.css";

function OrderPage() {
  const pathname: string = usePathname();
  const baseService = new BaseService();

  const [order, setOrder] = useState<OrderAllInfor | undefined>(undefined);
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!pathname) {
        return;
      }
      const orderId = pathname.slice(-42);

      const resOrder = await baseService.getOrderById(orderId);
      if (resOrder.data.status === "OK") {
        setOrder(resOrder.data.data);
        setOrderId(resOrder.data.data.order.id);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    pdfFromReact(".form-invoice", "My-file", "p", true, false);
  };

  return (
    <div className="">
      <div className="form-invoice">
        <div className="form-name ml-8 mb-4"> Invoice</div>
        <div className="invoice grid ml-8 mr-8">
          <div className="qr-code col-12 mb-4">
            <QRCode
              className=""
              size={300}
              bgColor="white"
              fgColor="black"
              value={orderId}
            />
          </div>

          <div className="order-id col-12 md:text-base text-sm text-center">
            Order ID: {order?.order.id}
          </div>
          <div className="description col-12 text-center">
            Description: {order?.inforOder?.description}
          </div>
          <div className="sender col-12 md:col-4">
            Sender
            <ul>
              <li>Name: {order?.inforOder?.senderName}</li>
              <li>Phone Number: {order?.inforOder?.senderNumber}</li>
              <li>Address: {order?.inforOder?.senderAddress}</li>
              <li>Post Code: {order?.inforOder?.senderPostCode}</li>
            </ul>
          </div>
          <div className="receiver col-12 md:col-4">
            Receiver
            <ul>
              <li>Name: {order?.inforOder?.receiverName}</li>
              <li>Phone Number: {order?.inforOder?.receiverNumber}</li>
              <li>Address: {order?.inforOder?.receiverAddress}</li>
              <li>Post Code: {order?.inforOder?.receiverPostCode}</li>
            </ul>
          </div>
          <div className="details col-12 md:col-4">
            Details
            <ul>
              <li>Mass: {order?.inforOder?.mass}</li>
              <li>Type of Goods: {order?.inforOder?.typeGoods}</li>
              <li>Base Fee: {order?.inforOder?.baseFee}</li>
              <li>Additional Fee: {order?.inforOder?.additionalFee}</li>
              <li>VAT: {order?.inforOder?.VAT}</li>
              <li>Cost: {order?.inforOder?.cost}</li>
              <li>Other Charges: {order?.inforOder?.Othercharge}</li>
              <li>Receiver COD: {order?.inforOder?.reveiverCOD}</li>
              <li>
                Receiver Other Charges: {order?.inforOder?.reveicerOthercharge}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button className="ml-8 mt-4" onClick={handleButtonClick}>Generate PDF</Button>
    </div>
  );
}

export default OrderPage;