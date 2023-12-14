import React from 'react'
import { DataView } from 'primereact/dataview';

import { Column } from 'primereact/column';
import { PROVINCE_ENUM } from '../../../public/utils/Utils';
import { AddressProvince } from '@/public/utils/interface';
import { Card } from 'primereact/card';
function GridView() {

    const itemTemplate = (province: AddressProvince) => {
        return (
            <Card className='col-12 md:col-6 lg:col-4 cursor-pointer border-round w-20rem h-10rem flex align-items-center m-4' onClick={() => { window.location.href = `/director/pointmanager/province/${province.code}` }}>
                <div className='grid'>
                    <div className='col-5'>
                        <img className="w-5rem" src={'https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/pig.png?alt=media&token=fa12d5cb-5615-43a0-a46b-ee8a71850d7e'} alt='province image' />
                    </div>
                    <div className='col-7 infor'>
                        <div className="text-2xl font-bold text-900">{province.name}</div>
                        <div>{province.code}</div>
                    </div>
                </div>
            </Card>
        )
    }
    return (
        <div>
            <DataView value={PROVINCE_ENUM} itemTemplate={itemTemplate} />
        </div>
    )
}

export default GridView;