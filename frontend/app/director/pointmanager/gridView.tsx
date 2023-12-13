import React from 'react'
import { DataView } from 'primereact/dataview';

import { Column } from 'primereact/column';
import { PROVINCE_ENUM } from '../../../public/utils/Utils';
import { AddressProvince } from '@/public/utils/interface';
function GridView() {

    const itemTemplate = (province: AddressProvince) => {
        return (
            <div className='col-12 md:col-6 lg:col-4 cursor-pointer' onClick={()=>{window.location.href = `/director/pointmanager/province/${province.code}`}}>
                <div className='flex flex-column xl:flex-row xl:align-items-start p-4 gap-4'>
                <img className="w-7rem sm:w-9rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={'https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/pig.png?alt=media&token=fa12d5cb-5615-43a0-a46b-ee8a71850d7e'} alt='province image' />
                <div className="text-2xl font-bold text-900">{province.name}</div>
                <div>{province.code}</div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <DataView value={PROVINCE_ENUM} itemTemplate={itemTemplate} />
        </div>
    )
}

export default GridView;