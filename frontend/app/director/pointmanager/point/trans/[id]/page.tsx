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
import { hubPageFilter, transPageFilter } from '@/public/utils/Utils'
import ListOrder from './ListOrder'

const TransactionPage = () => {
  const pathname: string = usePathname();
  const baseService = new BaseService();
  const [inforTrans, setInforTrans] = useState<PointHubTrans | undefined>();
  const [choose, setChoose] = useState<number>(0);
  const [user, setUser] = useState<UserInfor[] | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      if (!pathname) {
        return;
      }
      const transId = pathname.slice(-12);
      try {
        const resTrans: any = await baseService.getTransById(transId);
        const resUser: any = await baseService.getUserOnPoint(transId);
        console.log(resTrans);
        console.log(resUser);


        if (resTrans.data.status == 'OK') {
          setInforTrans(resTrans.data.data);
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
    <div className='trans-page flex flex-column'>
      <div className="banner flex align-items-center justify-content-center ">
        <div className='relative flex flex-column'>
          <div className='flex'>
            <Banner />
          </div>
          <Avatar
            image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6"
            className="mr-4 ml-2 avatar absolute md:w-10rem md:h-10rem sm:w-10rem sm:h-10rem w-8rem h-8rem"
            shape="circle"
          />
          <p className='hub-name flex text-4xl'><strong>{inforTrans?.name}</strong></p>
        </div>
      </div>

      <div className='md:block hidden'>
        <TabMenu className='flex justify-content-left ml-4' model={transPageFilter} activeIndex={choose} onTabChange={(e) => setChoose(e.index)} />
      </div>


      {/* <div className='flex flex-row m-4'>
        <div className='flex ml-4 cursor-pointer' onClick={() => { setChoose(1) }}>Chung</div>
        <div className='flex ml-4 cursor-pointer' onClick={() => { setChoose(2) }}>Thêm thành viên</div>
        <div className='flex ml-4 cursor-pointer' onClick={() => { setChoose(3) }}>Chỉnh sửa thành viên</div>
      </div> */}


      <div className="trans-stories flex grid mt-1">
        <div className='trans-info border-round col-10 md:col-4 ml-4 mr-4'>
          <Card className="">
            <p className='font-italic font-bold text-xl'>Thông tin cơ bản </p>
            <div className='mb-1'><span><strong>Mã điểm: </strong></span>{inforTrans?.id}</div>
            <div className='mb-1'><span><strong>SĐT: </strong></span>{inforTrans?.numberPhone}</div>
            {/* <div className='mb-1'><span><strong>{(inforHub?.province === 'Hà Nội' || inforHub?.province === 'Hồ Chí Minh') ? 'Quận:' : ': '} </strong></span>{inforHub?.cityDistrict}</div> */}
            <div className='mb-1'><span><strong>{(inforTrans?.province === 'Hà Nội' || inforTrans?.province === 'Hồ Chí Minh') ? 'Thành Phố: ' : 'Tỉnh: '}</strong></span>{inforTrans?.province}</div>
            <div className=''><span><strong>Địa chỉ: </strong></span>{inforTrans?.address}</div>
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
                  {(5 == user.UserPoint[0].type) && (
                    <Chip label={user.username + '    (Giám đốc)'} image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6" />
                  )}
                  <div key={user.username}>
                    {(51 == user.UserPoint[0].type) && (
                      <Chip label={user.username + '    (Trưởng điểm)'} image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6" />
                    )}
                  </div>
                  {([511,512].includes(user.UserPoint[0].type)) && (
                    <Chip label={user.username + '    (Nhân viên)'} image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className='hub-order col-10 md:col-6 md:block hidden'>
          {
            (choose == 0) && (
              <Card className=''>
                <p className='font-italic font-bold text-xl'>Thông tin Order </p>
                <ListOrder transId={inforTrans?.id} />
              </Card>
            )
          }
          {
            (choose == 1) && (
              <Card className=''>
                <p className='font-italic font-bold text-xl'>Thêm thành viên cho Điểm giao dịch {inforTrans?.name}</p>
                <FormAddAuth transId={inforTrans?.id} />
              </Card>
            )
          }
          {
            (choose == 2) && (
              <Card className=''>
                <p className='font-italic font-bold text-xl'>chinh sua nguoi dung</p>
              </Card>
            )
          }
        </div>

        <div className='hub-order col-10 md:col-6 block md:hidden ml-4'>
          <Card className=''>
            <p className='font-italic font-bold text-xl'>Thêm thành viên cho Điểm giao dịch {inforTrans?.name}</p>
            <FormAddAuth transId={inforTrans?.id} />
          </Card>
        </div>
        <div className='hub-order col-10 md:col-6 block md:hidden ml-4'>
          <Card className=''>
            <p className='font-italic font-bold text-xl'>chinh sua nguoi dung</p>
          </Card>
        </div>
        <div className='hub-order col-10 md:col-6 block md:hidden ml-4'>
          <Card className=''>
            <p className='font-italic font-bold text-xl'>Thông tin Order </p>
            <ListOrder transId={inforTrans?.id} />
          </Card>
        </div>


      </div>
    </div>
  )
}

export default TransactionPage