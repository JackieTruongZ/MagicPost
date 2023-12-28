'use client'

import { BaseService } from '@/app/service/BaseService'
import { UserRoleInfor, UserUserPoint } from '@/public/utils/interface';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'

const ListAccount = () => {
  const baseService = new BaseService();
  const [users, setUsers] = useState<UserUserPoint[] | undefined>();
  const [pointType, setPointType] = useState('');
  const [point, setPoint] = useState('');

  useEffect(() => {
    const storedpointType: string | null = window.localStorage.getItem('pointType');
    const storedpoint: string | null = window.localStorage.getItem('point');
    if (storedpointType) {
      setPointType(storedpointType);
    }
    if (storedpoint) {
      setPoint(storedpoint);
    }
    const fetchData = async (point: string) => {
      try {
        const res: any = await baseService.getUserOnPoint(point);
        console.log(res);
        if (res.data.status == 'OK') {
          setUsers(res.data.data);
        }

      } catch (error) {
        console.log(error);
      }
    };
    if (point) {
      fetchData(point);
    }

    return () => {
      // Xử lý dọn dẹp (nếu cần)
    };
  }, [point])
  return (
    <div className='listaccount'>
      {/* <p>ListAccount</p> */}
      <DataTable value={users} stripedRows className='cursor-pointer listview' tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id" body={(rowData: UserUserPoint) => <span>{rowData.id}</span>}></Column>
        <Column field="username" header="Username" body={(rowData: UserUserPoint) => <span>{rowData.username}</span>}></Column>
        <Column field="email" header="Email" body={(rowData: UserUserPoint) => <span>{rowData.email}</span>}></Column>
        <Column header="Họ và Tên" body={(rowData: UserUserPoint) => <span>{rowData.firstName} {rowData.lastName}</span>} />
        <Column field="createdAt" header="Ngày tham gia" body={(rowData: UserUserPoint) => <span>{rowData.createdAt.slice(0, 10)}</span>}></Column>

      </DataTable>
      {
        !users && (
          <div><p>Đang Load</p></div>
        )
      }
    </div>
  )
}

export default ListAccount