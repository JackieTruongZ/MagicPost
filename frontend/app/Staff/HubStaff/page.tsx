'use client'

import { Button } from 'primereact/button';
import React, { useEffect, useRef, useState } from 'react'
import { orderHubFilter } from '@/public/utils/Utils';
import { TabMenu } from 'primereact/tabmenu';
import './style.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Order } from '@/public/utils/interface';
import { BaseService } from '@/app/service/BaseService';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import QRCodeScanner from '@/app/components/qrcode';



interface ButtonConfirmProps {
    rowData: Order;
}

const HubStaffPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const baseService = new BaseService();

    const [stayOrder, setStayOrder] = useState<number | undefined>(0);
    const [moveInOrder, setMoveInOrder] = useState<number | undefined>(0);
    const [orders, setOrder] = useState<Order[] | undefined>();
    const [pointType, setPointType] = useState('');
    const [point, setPoint] = useState('');
    const [orderId, setOrderId] = useState<string | undefined>('');
    const [orderIdConfirm, setOrderIdConfirm] = useState<string | undefined>(undefined);
    const [typeOfConfirm, setTypeOfConfirm] = useState<number | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [resfresh, setRefresh] = useState<boolean>(true);
    const toast = useRef<Toast | null>(null);


    // set up camera 

    const [visiblePopUpCamera, setVisiblePopUpCamera] = useState<boolean>(false);
    const [visiblePopUpQR, setVisiblePopUpQR] = useState<boolean>(false);

    const CameraHandle = () => {
        setVisiblePopUpCamera(true);
        setVisiblePopUpQR(true);
    }

    const clearCameraHandle = () => {
        setVisiblePopUpQR(false);
        setVisiblePopUpCamera(false);
    }

    // set up for confirm popup
    const [visiblePopUpConfirm, setVisiblePopUpConfirm] = useState<boolean>(false);

    const ButtonConfirm = ({ rowData }: ButtonConfirmProps) => {
        return (
            <div className="card flex justify-content-center">
                <Button label="Xác nhận" icon="pi pi-verified" onClick={() => { buttonConfirmHandle(rowData) }} />
                {/* <Dialog header="Xác nhận đơn hàng" visible={visiblePopUpConfirm} style={{ width: '50vw' }} onHide={() => setVisiblePopUpConfirm(false)} footer={footerContent}>
                    <p>Nhập Id đơn hàng hoặc quét mã đơn hàng</p>
                    <InputText placeholder='Id đơn hàng ở đây...' value={orderId} onChange={(e) => setOrderIdOnInputText(e)} />
                    <p>{errorMessage}</p>
                </Dialog> */}
            </div>
        );
    }

    const PopupConfirmForm = () => {
        return (
            <div className='popup-overlay'>
                <div className='confirm-popup'>
                    <p>Nhập Id đơn hàng hoặc quét mã đơn hàng</p>
                    <InputText placeholder='Id đơn hàng ở đây...' value={orderId} onChange={(e) => setOrderIdOnInputText(e)} autoFocus />
                    <p>{errorMessage}</p>
                    <div>
                        <Button label='camera' icon="pi pi-camera" />
                        <Button label="Hủy" icon="pi pi-times" onClick={() => setVisiblePopUpConfirm(false)} className="p-button-text" />
                        <Button label="Xác nhận" icon="pi pi-check" onClick={() => ConfirmHandle()} autoFocus />
                    </div>
                </div>
            </div>
        )
    }


    const setOrderIdOnInputText = (e: any) => {
        console.log(e.target.value);
        setVisiblePopUpConfirm(true);
        setOrderId(e.target.value);
    }

    const buttonConfirmHandle = (rowData: Order) => {
        setTypeOfConfirm(activeIndex);
        setOrderIdConfirm(rowData.id);
        setVisiblePopUpConfirm(true);
    }

    const ConfirmHandle = async () => {
        if (!orderId) {
            setErrorMessage('Không để trống !');
            return 0;
        }

        if (orderId !== orderIdConfirm) {
            setErrorMessage('Sai OrderId !');
            return 0;
        }
        if (0 == typeOfConfirm) {
            const formData = {
                orderId: orderId
            }
            try {
                const resConfirm: any = await baseService.confirmOrderOnTrans(formData);
                if (resConfirm.data.status == 'OK') {
                    ClearHandle();
                    toast.current?.show({ severity: 'success', summary: 'Success', detail: `Xác nhận thành công` });

                } else {
                    ClearHandle();
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: `${resConfirm.data.data}` });
                }
            } catch (error) {
                ClearHandle();
                toast.current?.show({ severity: 'error', summary: 'Error', detail: `Confirm error` });
            }
            setRefresh(!resfresh);
        }
        if (typeOfConfirm == 1) {
            const formData = {
                orderId: orderId
            }
            try {
                const resConfirm: any = await baseService.confirmOrderFromTrans(formData);
                if (resConfirm.data.status == 'OK') {
                    ClearHandle();
                    toast.current?.show({ severity: 'success', summary: 'Success', detail: `Xác nhận thành công` });

                } else {
                    ClearHandle();
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: `${resConfirm.data.data}` });
                }
            } catch (error) {
                ClearHandle();
                toast.current?.show({ severity: 'error', summary: 'Error', detail: `Confirm error` });
            }
            setRefresh(!resfresh);
        }
    }

    const ClearHandle = () => {
        setVisiblePopUpConfirm(false);
        setOrderId(undefined);
        setOrderIdConfirm(undefined);
        setErrorMessage(undefined);
    }

    useEffect(() => {
        const storedpointType: string | null = window.localStorage.getItem('pointType');
        const storedpoint: string | null = window.localStorage.getItem('point');
        if (storedpointType) {
            setPointType(storedpointType);
        }
        if (storedpoint) {
            setPoint(storedpoint);
        }

        const fetchData = async () => {
            setOrder(undefined);
            try {

                const formData = {
                    pointId: point,
                }

                const resStayOrder: any = await baseService.findOrderOnPoint(formData);
                const resMoveInOrder: any = await baseService.findOrderMoveInPoint(formData);

                if ([resStayOrder.data.status, resMoveInOrder.data.status].includes('OK')) {
                    setStayOrder(resStayOrder.data.data.length);
                    setMoveInOrder(resMoveInOrder.data.data.length);

                    if (activeIndex == 0) {
                        setOrder(resMoveInOrder.data.data);
                    }
                    if (activeIndex == 1) {
                        setOrder(resStayOrder.data.data);
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

        if (point) {

            fetchData();
        }
        console.log('check');

        return () => {
            // Xử lý dọn dẹp (nếu cần)
        };
    }, [point, activeIndex, resfresh])

    return (
        <div>
            <Toast ref={toast} />
            <p>Order Manager</p>
            {
                visiblePopUpConfirm && (
                    <div className='popup-overlay'>
                        <div className='confirm-popup'>
                            <p>Nhập Id đơn hàng hoặc quét mã đơn hàng</p>
                            <InputText placeholder='Id đơn hàng ở đây...' value={orderId} onChange={(e) => setOrderId(e.target.value)} autoFocus />
                            <Button icon="pi pi-camera" onClick={() => { CameraHandle() }} />
                            <p>{errorMessage}</p>
                            <div>
                                <Button label="Hủy" icon="pi pi-times" onClick={() => ClearHandle()} className="p-button-text" />
                                <Button label="Xác nhận" icon="pi pi-check" onClick={() => ConfirmHandle()} autoFocus />
                            </div>
                        </div>
                    </div>
                )
            }

            {
                visiblePopUpCamera && (
                    <div className='popup-overlay'>
                        <div className='confirm-popup'>
                            <QRCodeScanner visible={visiblePopUpQR} setVisible={clearCameraHandle} orderId={orderId} setOrderId={setOrderId} />
                            {
                                orderId ? (
                                    <Button label="Xác nhận" icon="pi pi-check" onClick={() => clearCameraHandle()} />

                                ) : (
                                    <Button className="p-button-text" label="Hủy" icon="pi pi-times" onClick={() => clearCameraHandle()} />
                                )
                            }
                        </div>
                    </div>
                )
            }


            {/* <div className='flex mb-2'>
                <Button label='+ Tạo đơn hàng' className='flex right-0 mr-4 pl-3' onClick={createOrder} />
            </div> */}
            {/* <div className='flex flex-row justify-content-center'>
        {orderFilter.map((order)=>(
          <div className='flex m-2 justify-content-center'><p>{order.label}</p></div>
        ))}
      </div> */}

            <TabMenu className='flex justify-content-center' model={orderHubFilter} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

            <div className='listorder'>
                <DataTable value={orders} stripedRows className='cursor-pointer listview' tableStyle={{ minWidth: '50rem' }}>
                    <Column field="orderId" header="orderId" body={(rowData: Order) => <span>{rowData.id}</span>}></Column>
                    <Column field="userId" header="Người tạo đơn" body={(rowData: Order) => <span>{rowData.userId}</span>}></Column>
                    <Column field="date" header="Ngày tạo đơn" body={(rowData: Order) => <span>{rowData.createdAt.slice(0, 10)}</span>}></Column>
                    <Column field="Button" header="Xác nhận" body={(rowData: Order) => <ButtonConfirm rowData={rowData} />}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default HubStaffPage;