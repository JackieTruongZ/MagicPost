'use client'
import React from 'react';
import './style.css';
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { BaseService } from '../service/BaseService';
import { Toast } from 'primereact/toast';

function FindOrder() {
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useRef<Toast | null>(null);
const baseService: BaseService = new BaseService();
    const handleSearch = async() => {
        // Perform search logic with the searchTerm
        try {
            const order :any = await baseService.getOrderById(searchTerm);
            console.log(order);
            if (order.data.status === 'OK') {
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Find order success !'});
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: `${order.data.data}` });
            }
        } catch (error) {
            console.log(error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: `Error when get Order !` });
        }
    };
    return (
        <div className="component-container h-auto">
              <Toast ref={toast} />
            <div className='h-screen flex align-items-center flex justify-content-center flex-wrap'>
                <div className="search flex align-items-center justify-content-center font-bold border-round m-2">
                    <Button
                        icon="pi pi-search"
                        onClick={handleSearch}
                        className="p-button-lg p-mr-2 border-noround-right border-round-left-lg"
                    />
                    <span className="p-float-label">
                        <InputText
                            id="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-inputtext-lg border-noround-left border-round-right-lg"
                        />
                        <label htmlFor="searchInput">Search</label>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FindOrder