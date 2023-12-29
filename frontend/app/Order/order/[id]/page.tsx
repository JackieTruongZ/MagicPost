'use client'


import { BaseService } from '@/app/service/BaseService';
import { OrderAllInfor } from '@/public/utils/interface';
import { usePathname } from 'next/navigation';
import { Button } from 'primereact/button';
import QRCode from 'react-qr-code';
import React, { useEffect, useState } from 'react'

function OrderPage() {

    const pathname: string = usePathname();
    const baseService = new BaseService();

    const [order, setOrder] = useState<OrderAllInfor | undefined>(undefined);
    const [orderId, setOrderId] = useState<string>('');
    useEffect(() => {

        const fetchData = async () => {
            if (!pathname) {
                return;
            }
            const orderId = pathname.slice(-42);

            const resOrder = await baseService.getOrderById(orderId);
            if (resOrder.data.status == 'OK') {
                setOrder(resOrder.data.data);
                setOrderId(resOrder.data.data.order.id);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <p>OrderPage</p>
            <Button onClick={() => console.log(order)} />

            <div>
                <h2>Invoice</h2>
                <div>
                    <QRCode className='ml-4' size={300} bgColor='white' fgColor='black' value={orderId} />
                    <h3 className='md:text-base text-sm '>Order ID: {order?.order.id}</h3>
                    <p>Description: {order?.inforOder?.description}</p>
                    <p>Sender:</p>
                    <ul>
                        <li>Name: {order?.inforOder?.senderName}</li>
                        <li>Phone Number: {order?.inforOder?.senderNumber}</li>
                        <li>Address: {order?.inforOder?.senderAddress}</li>
                        <li>Post Code: {order?.inforOder?.senderPostCode}</li>
                    </ul>
                    <p>Receiver:</p>
                    <ul>
                        <li>Name: {order?.inforOder?.receiverName}</li>
                        <li>Phone Number: {order?.inforOder?.receiverNumber}</li>
                        <li>Address: {order?.inforOder?.receiverAddress}</li>
                        <li>Post Code: {order?.inforOder?.receiverPostCode}</li>
                    </ul>
                    <p>Details:</p>
                    <ul>
                        <li>Mass: {order?.inforOder?.mass}</li>
                        <li>Type of Goods: {order?.inforOder?.typeGoods}</li>
                        <li>Base Fee: {order?.inforOder?.baseFee}</li>
                        <li>Additional Fee: {order?.inforOder?.additionalFee}</li>
                        <li>VAT: {order?.inforOder?.VAT}</li>
                        <li>Cost: {order?.inforOder?.cost}</li>
                        <li>Other Charges: {order?.inforOder?.Othercharge}</li>
                        <li>Receiver COD: {order?.inforOder?.reveiverCOD}</li>
                        <li>Receiver Other Charges: {order?.inforOder?.reveicerOthercharge}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;