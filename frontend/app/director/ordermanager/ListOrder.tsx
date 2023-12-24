'use client'

import { BaseService } from '@/app/service/BaseService'
import { orderTypeFilter } from '@/public/utils/Utils';
import { AllOrderInforWithRoad } from '@/public/utils/interface';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react'

const ListOrder = () => {
  const baseService = new BaseService();
  const [orders, setOrders] = useState<AllOrderInforWithRoad[] | undefined>();
const [view, setView] = useState(orderTypeFilter.at(0)?.value);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = {
          type: view,
        }
        setOrders(undefined);
        const res = await baseService.getAllOrder(formData);
        console.log(res);
        if (res.data.status == 'OK') {
          setOrders(res.data.data);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Xử lý dọn dẹp (nếu cần)
    };
  }, [view])
  return (
    <div className='listorder surface-overlay border-round'>
      {/* <p>ListOrder</p> */}
      <Dropdown
          id="orderType"
          value={view}
          options={orderTypeFilter}
          onChange={(e) => setView(e.target.value)}
          placeholder="Tất cả mọi người"
          className='flex'
        />
      <DataTable value={orders} stripedRows className='cursor-pointer listview' tableStyle={{ minWidth: '50rem' }}>
      <Column field="orderId" header="orderId" body={(rowData: AllOrderInforWithRoad) => <span>{rowData.order.id}</span>}></Column>
      <Column field="orderId" header="orderId" body={(rowData: AllOrderInforWithRoad) => <span>{rowData.order.userId}</span>}></Column>
      <Column field="orderId" header="orderId" body={(rowData: AllOrderInforWithRoad) => <span>{rowData.order.createdAt.slice(0,10)}</span>}></Column>
      <Column field="orderId" header="orderId" 
      body={(rowData: AllOrderInforWithRoad) =>{
        let status: string|undefined ;
        if (rowData.road.status == 'wait') {
          status = 'Đang chờ xác nhận';
        }
        if (rowData.road.status == 'stay') {
          status = 'Đang ở điểm';
        }
        if (rowData.road.status == 'move') {
          status = 'Đang di chuyển đến điểm';
        }
        if (rowData.road.status == 'success') {
          status = 'Đã giao thành công';
        }
        if (rowData.road.status == 'fail') {
          status = 'Giao hàng không thành công';
        }
        if (rowData.road.status == 'return') {
          status = 'Đang hoàn trả hàng'
        }
        return <span>{status}</span>
      }}> </Column>

      </DataTable>
      {
        !orders && (
          <div><p>Đang Load</p></div>
        )
      }
    </div>
  )
}

export default ListOrder;