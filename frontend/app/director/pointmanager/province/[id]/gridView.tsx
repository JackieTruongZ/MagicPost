import React from 'react'
import { DataView } from 'primereact/dataview';
import { PointHubTrans } from '@/public/utils/interface';
import { Card } from 'primereact/card';
import './style.css'

interface Props {
    pointType: string;
    point: PointHubTrans[];
};

const GridView = ({ pointType, point }: Props) => {

    const itemTemplate = (point: PointHubTrans) => {
        return (
            <Card className='cursor-pointer col-12 md:col-6 lg:col-2 border-round w-20rem h-10rem flex align-items-center m-4' onClick={() => { window.location.href = `/director/pointmanager/point/${pointType}/${point.id}` }}>
                <div className='grid'>
                    <div className='col-5'>
                        <img className="w-5rem" src={'https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/pig.png?alt=media&token=fa12d5cb-5615-43a0-a46b-ee8a71850d7e'} alt='province image' />
                        <div className=''>{point.name}</div>
                    </div>
                    <div className='col-7 infor'>
                        <div className='mb-1'><span><strong>Mã điểm: </strong></span>{point.id}</div>
                        <div className='mb-1'><span><strong>SĐT: </strong></span>{point.numberPhone}</div>
                        <div className=''><span><strong>Địa chỉ: </strong></span>{point.cityDistrict} - {point.province}</div>
                    </div>
                </div>
            </Card>
        )
    }
    return (
        <div>
            <DataView className='flex flex-wrap column-gap-4 row-gap-6' value={point} itemTemplate={itemTemplate} />
        </div>
    )
}

export default GridView;