'use client'

import React, { useState } from 'react'
import ListAccount from './ListAccount';
import './style.css';
import { userFilter } from '@/public/utils/Utils';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function AccountManager() {
  const [view, setView] = useState(userFilter.at(0)?.value);

  const createUser = () => {
    window.location.href = '/grantAccess';
  }
  return (
    <div>
      <div className='flex flex-row mb-2'>
        <Dropdown
          id="userType"
          value={view}
          options={userFilter}
          onChange={(e) => setView(e.target.value)}
          placeholder="Tất cả mọi người"
          className='flex'
        />
        <Button label='+ Thêm thành viên' className='flex absolute right-0 mr-4 pl-3' onClick={createUser}/>
      </div>
      <ListAccount view={view} />
    </div>
  )
}

export default AccountManager;