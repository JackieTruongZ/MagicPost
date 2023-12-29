'use client'
import { BaseService } from '@/app/service/BaseService';
import { findProvinceById } from '@/public/utils/Utils';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import CreatePointFrom from './createPointFrom';
import { ResponseData } from '@/public/utils/interface';
import GridView from './gridView';

const PointManagerDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname: string = usePathname();   
  const baseService = new BaseService();
  const [hubs, setHubs] = useState<ResponseData | undefined>();
  const [trans, setTrans] = useState<ResponseData | undefined>();
  const [createHub, setCreateHub] = useState(false);
  const [createTrans, setCreateTrans] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const closeCreateForm = () => {
    setCreateTrans(false);
    setCreateHub(false);
    setFormSubmitted(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!pathname) {
        return;
      }
      const provinceId = pathname.slice(-2);
      try {
        const resHubs: any = await baseService.getHubsByProvinceId(provinceId);
        const resTrans: any = await baseService.getTransByProvinceId(provinceId);

        console.log(resHubs);
        console.log(resTrans);


        if (resHubs.data.status) {
          // setCheckHub(true);
          setHubs(resHubs.data);
        }
        if (resTrans.data.status) {
          // setCheckTrans(true);
          setTrans(resTrans.data);
        }


      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Xử lý dọn dẹp (nếu cần)
    };
  }, [router, formSubmitted]);

  return (
    <div>
      <p>{findProvinceById(pathname.slice(-2))}</p>
      <Button label='Tạo điểm tập kết' onClick={() => { setCreateHub(!createHub) }} />
      {
        createHub && (
          <CreatePointFrom point={'hub'} closeCreateForm={closeCreateForm} />
        )
      }
      {
        hubs !== undefined ? (
          <div>
            {(hubs?.status === 'FAIL') ? (
              <div>
                Không có điểm tập kết ở đây !
              </div>
            ) : (
              <div>
                 <GridView pointType={'hub'} point={hubs.data} />
              </div>
            )}
          </div>
        ) : (
          <div>đang load !</div>
        )
      }
      <hr />
      <p>Transaction Point</p>
      <Button label='Tạo điểm giao dịch' onClick={() => { setCreateTrans(!createTrans) }} />
      {
        createTrans && (
          <CreatePointFrom point={'trans'} closeCreateForm={closeCreateForm} />
        )
      }
      {
        trans !== undefined ? (
          <div>
            {(trans?.status === 'FAIL') ? (
              <div>
                Không có điểm giao dịch ở đây !
              </div>
            ) : (
              <div>
                <GridView pointType={'trans'} point={trans.data} />
              </div>
            )}
          </div>
        ) : (
          <div>đang load !</div>
        )
      }
    </div>
  );
};

export default PointManagerDetail;