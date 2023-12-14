'use client'
import Banner from '@/app/components/Banner/page'
import { Avatar } from 'primereact/avatar'
import React, { useEffect, useState } from 'react'
import '../../style.css'
import { usePathname } from 'next/navigation'
import { BaseService } from '@/app/service/BaseService'
import { PointHubTrans } from '@/public/utils/interface'
import { Card } from 'primereact/card'
const TransactionPage = () => {
  const pathname: string = usePathname();
  const baseService = new BaseService();
  const [inforTrans, setInforTrans] = useState<PointHubTrans | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      if (!pathname) {
        return;
      }
      const transId = pathname.slice(-12);
      try {
        const resTrans: any = await baseService.getTransById(transId);

        console.log(resTrans);


        if (resTrans.data.status) {
          setInforTrans(resTrans.data.data);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Xử lý dọn dẹp (nếu cần)
    };
  }, [])
  return (
    <div className='hub-page flex flex-column'>
      <div className="banner flex align-items-center justify-content-center ">
        <div className='relative flex flex-column'>
          <div className='flex'>
            <Banner />
          </div>
          <Avatar
            image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6"
            className="mr-4 ml-2 avatar absolute sm:w-6rem sm:h-6rem md:w-10rem md:h-10rem w-4rem h-4rem"
            shape="circle"
          />
          <p className='hub-name flex left-0 text-4xl'><strong>{inforTrans?.name}</strong></p>
        </div>
      </div>
      <div className="hub-stories flex grid">
        <Card className="hub-info border-round col-12 md:col-4 ml-4 mr-4">
          <p className='font-italic font-bold text-xl'>Thông tin cơ bản </p>
          <div className='mb-1'><span><strong>Mã điểm: </strong></span>{inforTrans?.id}</div>
          <div className='mb-1'><span><strong>SĐT: </strong></span>{inforTrans?.numberPhone}</div>
          {/* <div className='mb-1'><span><strong>{(inforTrans?.province === 'Hà Nội' || inforHub?.province === 'Hồ Chí Minh') ? 'Quận:' : ': '} </strong></span>{inforHub?.cityDistrict}</div> */}
          <div className='mb-1'><span><strong>{(inforTrans?.province === 'Hà Nội' || inforTrans?.province === 'Hồ Chí Minh') ? 'Thành Phố: ' : 'Tỉnh: '}</strong></span>{inforTrans?.province}</div>
          <div className=''><span><strong>Địa chỉ: </strong></span>{inforTrans?.address}</div>
          <p className='font-italic font-bold text-xl'>Thông tin trưởng điểm và nhân viên </p>
        </Card>
        <Card className='hub-order col-12 md:col-6'>
          <p className='font-italic font-bold text-xl'>Thông tin Order </p>
        </Card>
      </div>
    </div>
  )
}

export default TransactionPage;