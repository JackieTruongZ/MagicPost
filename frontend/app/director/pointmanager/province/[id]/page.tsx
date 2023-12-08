'use client'
import { BaseService } from '@/app/service/BaseService';
import { findProvinceById } from '@/public/utils/Utils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';

const PointManagerDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname: string = usePathname();
  const baseService = new BaseService();
  const [hubs, setHubs] = useState([]);
  const [trans, setTrans] = useState([]);
  const [checkHub, setCheckHub] = useState(false);
  const [checkTrans, setCheckTrans] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      if (!pathname) {
        return;
      }
      const provinceId = pathname.slice(-2);
      try {
        const resHubs: any = await baseService.getHubsByProvinceId(provinceId);
        const resTrans: any = await baseService.getTransByProvinceId(provinceId);
  
        if (resHubs.statusText === 'OK') {
          setCheckHub(true);
          setHubs(resHubs.data);
        }
        if (resTrans.statusText === 'OK') {
          setCheckTrans(true);
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
  }, [router]);

  return (
    <div>
      <p>{findProvinceById(pathname.slice(-2))}</p>
      <p>Hub Point</p>
      {
        checkHub ? (
          <div>
          </div>
        ) : (
          <div>đang load !</div>
        )
      }
      <hr />
      <p>Transaction Point</p>
      {
        checkTrans ? (
          <div></div>
        ) : (
          <div>đang load !</div>
        )
      }
    </div>
  );
};

export default PointManagerDetail;