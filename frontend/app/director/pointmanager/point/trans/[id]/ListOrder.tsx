'use client'

import { BaseService } from '@/app/service/BaseService';
import { orderTransFilter } from '@/public/utils/Utils';
import { Order } from '@/public/utils/interface';
import { Column } from 'primereact/column';
import { DataScroller } from 'primereact/datascroller';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react'

interface Props {
    transId: string | undefined;
}

function ListOrder({ transId }: Props) {
    const baseService = new BaseService();
    // const [orders, setOrders] = useState<AllOrderInforWithRoad[] | undefined>();
    const [view, setView] = useState(orderTransFilter.at(2)?.value);
    const [stayOrder, setStayOrder] = useState<number | undefined>(0);
    const [waitOrder, setWaitOrder] = useState<number | undefined>(0);
    const [moveInOrder, setMoveInOrder] = useState<number | undefined>(0);
    const [orders, setOrder] = useState<Order[] | undefined>();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const formData = {
                    pointId: transId,
                }

                const resStayOrder: any = await baseService.findOrderOnPoint(formData);
                const resWaitOrder: any = await baseService.findOrderWaitOnTrans(formData);
                const resMoveInOrder: any = await baseService.findOrderMoveInPoint(formData);

                if ([resStayOrder.data.status, resMoveInOrder.data.status, resWaitOrder.data.status].includes('OK')) {
                    setStayOrder(resStayOrder.data.data.length);
                    setWaitOrder(resWaitOrder.data.data.length);
                    setMoveInOrder(resMoveInOrder.data.data.length);
                    if (view == '1') {
                        setOrder(resWaitOrder.data.data);
                    }
                    if (view == '2') {
                        setOrder(resMoveInOrder.data.data);
                    }
                    if (view == '3') {
                        setOrder(resStayOrder.data.data);
                    }
                    if (view == '4') {
                        const formData = {
                            pointId: transId,
                            status: 'success',
                        }
                        const resSuccessOrder: any = await baseService.findOrderSuccessFailReturn(formData);
                        setOrder(resSuccessOrder.data.data);
                    }
                    if (view == '5') {
                        const formData = {
                            pointId: transId,
                            status: 'fail',
                        }
                        const resFailOrder: any = await baseService.findOrderSuccessFailReturn(formData);
                        setOrder(resFailOrder.data.data);
                    }
                    if (view == '6') {
                        const formData = {
                            pointId: transId,
                            status: 'return',
                        }
                        const resReturnOrder: any = await baseService.findOrderSuccessFailReturn(formData);
                        setOrder(resReturnOrder.data.data);
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

        if (transId) {
            fetchData();
        }

        return () => {
            // Xử lý dọn dẹp (nếu cần)
        };
    }, [transId, view])


    // const itemTemplate = (data: Order) => {
    //     return (
    //         <div className="col-12">
    //             <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
    //                 <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6`} alt={'pig-img'} />
    //                 <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center lg:align-items-start gap-3">
    //                         <div className="flex flex-column gap-1">
    //                             <div className="text-2xl font-bold text-900">Order name</div>
    //                             <div className="text-700">{data.id}</div>
    //                             <div className="text-700">{data.userId}</div>
    //                         </div>
    //                     </div>
    //                     <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2 w-4rem">
    //                         <span className="text-2xl font-semibold">{data.createdAt.slice(0,10)}</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };


    return (
        <div className='listorder surface-overlay border-round'>
            {/* <p>ListOrder</p> */}
            <div className='flex flex-row'>
                <Dropdown
                    id="orderType"
                    value={view}
                    options={orderTransFilter}
                    onChange={(e) => setView(e.target.value)}
                    placeholder="Đơn đang trong kho"
                    className='flex w-20rem mr-4'
                />
                <div className='flex align-items-center font-bold'>
                    <span className='mr-2 text-red-500'>Trong kho : {stayOrder}</span>
                    <span className='mr-2 text-green-500'>Chờ xác nhận : {waitOrder}</span>
                    <span className='text-yellow-700'> Đang đến : {moveInOrder}</span>
                </div>
            </div>

            <DataTable value={orders} stripedRows className='cursor-pointer listview' tableStyle={{ minWidth: '50rem' }}>
                <Column field="orderId" header="orderId" body={(rowData: Order) => <span>{rowData.id}</span>}></Column>
                <Column field="orderId" header="Người tạo đơn" body={(rowData: Order) => <span>{rowData.userId}</span>}></Column>
                <Column field="orderId" header="Ngày tạo đơn" body={(rowData: Order) => <span>{rowData.createdAt.slice(0,10)}</span>}></Column>

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