'use client'

import { BaseService } from '@/app/service/BaseService'
import { UserRoleInfor } from '@/public/utils/interface';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'

interface Props {
  view: string | undefined;
}

const ListAccount = ({ view }: Props) => {
  const baseService = new BaseService();
  const [users, setUsers] = useState<UserRoleInfor[] | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(view);
        const formData = {
          type: view
        }
        const res = await baseService.getAllUser(formData);
        console.log(res);
        if (res.data.status == 'OK') {
          setUsers(res.data.data);
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
    <div className='listaccount'>
      {/* <p>ListAccount</p> */}
      <DataTable value={users} stripedRows className='cursor-pointer listview' tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id" body={(rowData) => <span>{rowData.user.id}</span>}></Column>
        <Column field="username" header="Username" body={(rowData) => <span>{rowData.user.username}</span>}></Column>
        <Column field="email" header="Email" body={(rowData) => <span>{rowData.user.email}</span>}></Column>
        <Column header="Họ và Tên" body={(rowData) => <span>{rowData.user.firstName} {rowData.user.lastName}</span>} />
        <Column field="password" header="Mật khẩu"
          body={(rowData) => {
            return (
              <div className='font-italic font-medium' onClick={togglePasswordVisibility}>
                {showPassword ? rowData.user.password : '******'}
              </div>
            );
          }}
        ></Column>
        <Column field="rowName" header="Chức vụ" body={(rowData) => <span>{rowData.role.name}</span>}></Column>
        <Column field="createdAt" header="Ngày tham gia" body={(rowData) => <span>{rowData.user.createdAt.slice(0, 10)}</span>}></Column>
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