'use client'

import { BaseService } from '@/app/service/BaseService';
import { orderHubFilter, orderTransFilter } from '@/public/utils/Utils';
import { Order } from '@/public/utils/interface';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { TabMenu } from 'primereact/tabmenu';
import React, { useEffect, useState } from 'react'

interface Props {
    hubId: string | undefined;
}

function ListOrder({ hubId }: Props) {
    const baseService = new BaseService();
    // const [orders, setOrders] = useState<AllOrderInforWithRoad[] | undefined>();
    const [view, setView] = useState(orderTransFilter.at(2)?.value);
    const [stayOrder, setStayOrder] = useState<number | undefined>(0);
    const [moveInOrder, setMoveInOrder] = useState<number | undefined>(0);
    const [orders, setOrder] = useState<Order[] | undefined>();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const formData = {
                    pointId: hubId,
                }
            
                const resStayOrder: any = await baseService.findOrderOnPoint(formData);
                const resMoveInOrder: any = await baseService.findOrderMoveInPoint(formData);

                if ([resStayOrder.data.status, resMoveInOrder.data.status].includes('OK')) {
                    setStayOrder(resStayOrder.data.data.length);
                    setMoveInOrder(resMoveInOrder.data.data.length);
                    if (view == '0') {
                        setOrder(resStayOrder.data.data);
                    }
                    if (view == '1') {
                        setOrder(resMoveInOrder.data.data);
                    }

                }
                // setOrders(undefined);

                // if (res.data.status == 'OK') {
                //     setOrders(res.data.data);
                // }

            } catch (error) {
                console.log(error);
            }
        };

        if (hubId) {
            fetchData();
        }

        return () => {
            // Xử lý dọn dẹp (nếu cần)
        };
    }, [hubId, view])
    return (
        <div className='listorder surface-overlay border-round'>
            {/* <p>ListOrder</p> */}
            <div className='flex flex-row'>
                <Dropdown
                    id="orderType"
                    value={view}
                    options={orderHubFilter}
                    onChange={(e) => setView(e.target.value)}
                    placeholder="Đơn đang trong kho"
                    className='flex w-20rem mr-4'
                />
                <div className='flex align-items-center font-bold'>
                    <span className='mr-2 text-red-500'>Trong kho : {stayOrder}</span>
                    <span className='text-yellow-700'> Đang đến : {moveInOrder}</span>
                </div>
            </div>
            <DataTable value={orders} stripedRows className='cursor-pointer listview' scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                <Column field="orderId" header="orderId" body={(rowData: Order) => <span onClick={()=>{window.location.href = `/Order/order/${rowData.id}`}} >{rowData.id}</span>}></Column>
                <Column field="orderId" header="Người tạo đơn" body={(rowData: Order) => <span>{rowData.userId}</span>}></Column>
                <Column field="orderId" header="Ngày tạo đơn" body={(rowData: Order) => <span>{rowData.createdAt.slice(0, 10)}</span>}></Column>

            </DataTable>
            {
                !orders && (
                    <div><p>Đang Load</p></div>
                )
            }

        </div>
    )
}

export default ListOrder