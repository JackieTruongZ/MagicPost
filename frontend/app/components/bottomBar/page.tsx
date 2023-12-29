'use client'

import React, { useEffect, useState } from 'react'
import './style.css'
import { BaseService } from '@/app/service/BaseService';
import Menu from './Menu';

function BottomBar() {
    const [username, setUsername] = useState('');
    const [roleId, setRoleId] = useState('');
    const [pointType, setPointType] = useState('');
    const [point, setPoint] = useState('');
    const [type, setType] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
    const baseService = new BaseService();
  
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
      const storedUsername: string | null = window.localStorage.getItem('username');
      const storedroleId: string | null = window.localStorage.getItem('roleId')
      const storedpointType: string | null = window.localStorage.getItem('pointType');
      const storedpoint: string | null = window.localStorage.getItem('point');
      const storedtype: string | null = window.localStorage.getItem('type');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedroleId) {
        setRoleId(storedroleId);
      }
      if (storedpointType) {
        setPointType(storedpointType);
      }
      if (storedpoint) {
        setPoint(storedpoint);
      }
      if (storedtype) {
        setType(storedtype);
      }
    }, []);
  
    const handleClick = (event: any) => {
      if (event.target.closest('.user-menu')) {
        setIsOpen(!isOpen);
      } else {
        setIsOpen(false);
      }
    };
  return (
    <div className='bottom-bar fixed'>
        <Menu roleId={roleId} />
    </div>
  )
}

export default BottomBar;