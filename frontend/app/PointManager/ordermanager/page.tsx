'use client'

import { Button } from 'primereact/button';
import React, { useState } from 'react'
import { orderFilter } from '@/public/utils/Utils';
import { TabMenu } from 'primereact/tabmenu';
import './style.css';
import MonthOrder from './MonthOrder';
import YearOrder from './YearOrder';
import ListOrderOnTrans from './ListOrderOnTrans';
import ListOrderOnHub from './ListOrderOnHub';

function OrderManager() {
  const [view, setView] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const createUser = () => {
    window.location.href = '/createOrder';
  }
  const roleIdStore = window.localStorage.getItem('roleId');
  return (
    <div>
      <p>Order Manager</p>
      <div className='flex mb-2'>
        <Button label='+ Tạo đơn hàng' className='flex right-0 mr-4 pl-3' onClick={createUser} />
      </div>
      {/* <div className='flex flex-row justify-content-center'>
        {orderFilter.map((order)=>(
          <div className='flex m-2 justify-content-center'><p>{order.label}</p></div>
        ))}
      </div> */}

      <TabMenu className='flex justify-content-center' model={orderFilter} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

      {
        (activeIndex == 0) && (
          <div>
            {
              (roleIdStore == '51') && (
                <ListOrderOnTrans />
              )
            }
              {
              (roleIdStore == '52') && (
                <ListOrderOnHub />
              )
            }
          </div>
        )
      }

      {
        (activeIndex == 1) && (
          <MonthOrder />
        )
      }

      {
        (activeIndex == 2) && (
          <YearOrder />
        )
      }

    </div>
  )
}

export default OrderManager;