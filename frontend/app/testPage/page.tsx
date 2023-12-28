"use client"
import React from 'react';
import { Button } from 'primereact/button';
import './style.css'; // Tạo file CSS để tùy chỉnh màu sắc
import { Link } from 'react-router-dom';

const BottomMenu = () => {
  return (
    <div className="bottom-menu">
      <Link to="/home">
        <Button icon="pi pi-home" className="p-button-rounded p-button-danger" />
      </Link>
      <div className='separator'></div>
      <Button icon="pi pi-search" className="p-button-rounded p-button-danger" />
    </div>
  );
};

export default BottomMenu;
