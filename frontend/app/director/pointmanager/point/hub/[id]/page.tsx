'use client'
import Banner from '@/app/components/Banner/page'
import { Avatar } from 'primereact/avatar'
import React, { useEffect, useState } from 'react'
import '../../style.css'
import { usePathname } from 'next/navigation'
import { BaseService } from '@/app/service/BaseService'
import { PointHubTrans, UserInfor } from '@/public/utils/interface'
import { Card } from 'primereact/card'
import FormAddAuth from './FormAddAuth'
import { Chip } from 'primereact/chip'
import { TabMenu } from 'primereact/tabmenu'
import { hubPageFilter } from '@/public/utils/Utils'
import ListOrder from './ListOrder'

const HubPage = () => {
  const pathname: string = usePathname();
  const baseService = new BaseService();
  const [inforHub, setInforHub] = useState<PointHubTrans | undefined>();
  const [choose, setChoose] = useState<number>(0);
  const [user, setUser] = useState<UserInfor[] | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      if (!pathname) {
        return;
      }
      const hubId = pathname.slice(-10);
      try {
        const resHubs: any = await baseService.getHubsById(hubId);
        const resUser: any = await baseService.getUserOnPoint(hubId);
        console.log(resHubs);
        console.log(resUser);


        if (resHubs.data.status == 'OK') {
          setInforHub(resHubs.data.data);
        }

        if (resUser.data.status == 'OK') {
          setUser(resUser.data.data);
        }
        if (resUser.data.status == 'FAIL') {
          setUser(undefined);
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
          <p className='hub-name flex left-0 text-4xl'><strong>{inforHub?.name}</strong></p>
        </div>
      </div>


      <TabMenu className='flex justify-content-left ml-4' model={hubPageFilter} activeIndex={choose} onTabChange={(e) => setChoose(e.index)} />
      
      
      {/* <div className='flex flex-row m-4'>
        <div className='flex ml-4 cursor-pointer' onClick={() => { setChoose(1) }}>Chung</div>
        <div className='flex ml-4 cursor-pointer' onClick={() => { setChoose(2) }}>Thêm thành viên</div>
        <div className='flex ml-4 cursor-pointer' onClick={() => { setChoose(3) }}>Chỉnh sửa thành viên</div>
      </div> */}


      <div className="hub-stories flex grid">
        <Card className="hub-info border-round col-12 md:col-4 ml-4 mr-4">
          <p className='font-italic font-bold text-xl'>Thông tin cơ bản </p>
          <div className='mb-1'><span><strong>Mã điểm: </strong></span>{inforHub?.id}</div>
          <div className='mb-1'><span><strong>SĐT: </strong></span>{inforHub?.numberPhone}</div>
          {/* <div className='mb-1'><span><strong>{(inforHub?.province === 'Hà Nội' || inforHub?.province === 'Hồ Chí Minh') ? 'Quận:' : ': '} </strong></span>{inforHub?.cityDistrict}</div> */}
          <div className='mb-1'><span><strong>{(inforHub?.province === 'Hà Nội' || inforHub?.province === 'Hồ Chí Minh') ? 'Thành Phố: ' : 'Tỉnh: '}</strong></span>{inforHub?.province}</div>
          <div className=''><span><strong>Địa chỉ: </strong></span>{inforHub?.address}</div>
          <p className='font-italic font-bold text-xl'>Thông tin trưởng điểm và nhân viên </p>
          <div className="card flex flex-column gap-2">
            {
              (!user) && (
                <div>
                  <p>Không có nhân viên ở đây hãy <span className='cursor-pointer text-red-500 font-italic' onClick={() => { setChoose(2) }}>thêm nhân viên</span></p>
                </div>
              )
            }
            {user?.map((user) => (
              <div key={user.username}>
                {(user.UserPoint[0].type == 5) && (
                  <Chip label={user.username + '    (Giám đốc)'} image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6" />
                )}
                  <div key={user.username}>
                {(user.UserPoint[0].type == 52) && (
                  <Chip label={user.username + '    (Trưởng điểm)'} image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6" />
                )}
              </div>
                 {( [521].includes(user.UserPoint[0].type) ) && (
                  <Chip label={user.username + '    (Nhân viên)'} image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6" />
                )}
              </div>
            ))}
          </div>
        </Card>
        {
          (choose == 0) && (
            <Card className='hub-order col-12 md:col-6'>
              <p className='font-italic font-bold text-xl'>Thông tin Order </p>
              <ListOrder hubId={inforHub?.id}/>
            </Card>
          )
        }
        {
          (choose == 1) && (
            <Card className='hub-order col-12 md:col-6'>
              <p className='font-italic font-bold text-xl'>Thêm thành viên cho Điểm tập kết {inforHub?.name}</p>
              <FormAddAuth hubId={inforHub?.id} />
            </Card>
          )
        }
        {
          (choose == 2) && (
            <Card className='hub-order col-12 md:col-6'>
              <p className='font-italic font-bold text-xl'>chinh sua nguoi dung</p>
            </Card>
          )
        }

      </div>
    </div>
  )
}

export default HubPage