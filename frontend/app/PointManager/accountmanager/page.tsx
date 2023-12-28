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
      <p>AccountManager</p>
      <div className='flex flex-row mb-2'>
        
        <Button label='+ Thêm thành viên' className='flex right-0 mr-4 pl-3' onClick={createUser}/>
      </div>
      <ListAccount />
    </div>
  )
}

export default AccountManager;