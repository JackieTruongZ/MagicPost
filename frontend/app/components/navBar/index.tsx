'use client'
import Container from "@/app/components/Container";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import './style.css';
import Menu from "./Menu";
import { BaseService } from "@/app/service/BaseService";
import { TabMenu } from "primereact/tabmenu";
import { menuDirector } from "@/public/utils/Utils";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [username, setUsername] = useState('');
  const [roleId, setRoleId] = useState('');
  const [pointType, setPointType] = useState('');
  const [point, setPoint] = useState('');
  const [type, setType] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const baseService = new BaseService();

  const [activeIndex, setActiveIndex] = useState(0);

  const path = usePathname();
  const [dashboard, setDasboard] = useState<boolean>(true);
  useEffect(() => {
    if (!path) {
      return
    }
    if (path == '/dashboard') {
      setDasboard(true);
    } else {
      setDasboard(false);
    }


    const storedUsername: string | null = window.localStorage.getItem('username');
    const storedroleId: string | null = window.localStorage.getItem('roleId')
    const storedpointType: string | null = window.localStorage.getItem('pointType');
    const storedpoint: string | null = window.localStorage.getItem('point');
    const storedtype: string | null = window.localStorage.getItem('type');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedroleId) {
      setRoleId(storedroleId);
    }
    if (storedpointType) {
      setPointType(storedpointType);
    }
    if (storedpoint) {
      setPoint(storedpoint);
    }
    if (storedtype) {
      setType(storedtype);
    }
  }, []);

  const handleClick = (event: any) => {
    if (event.target.closest('.user-menu')) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="h-auto w-full z-999 top-0 left-0 items-center justify-center">
      <Container>
       {
        dashboard ? (
          <div className="nav h-5rem fixed " onClick={handleClick} >
          <div className="cursor-pointer nav-title m-4 flex absolute left-0" onClick={()=>{window.location.href='/dashboard'}}> <p> MagicPost</p> </div>
          {/* <div id="pig" className="pig m-10"></div> */}
          <div className="w-4"></div>

          <div className="menu">
            <Menu roleId={roleId} />
          </div>

          <div className="user-menu flex absolute right-0">
            <UserMenu isOpen={isOpen} setIsOpen={setIsOpen} username={username} />
          </div>
        </div>
        ) : (
          <div className="nav h-5rem relative flex-row" onClick={handleClick} >
          <div className="cursor-pointer nav-title m-4 flex absolute left-0" onClick={()=>{window.location.href='/dashboard'}}> <p> MagicPost</p> </div>
          {/* <div id="pig" className="pig m-10"></div> */}
          <div className="w-4"></div>

          <div className="menu">
            <Menu roleId={roleId} />
          </div>

          <div className="user-menu flex absolute right-0">
            <UserMenu isOpen={isOpen} setIsOpen={setIsOpen} username={username} />
          </div>
        </div>
        )
       }
      </Container>
    </div>
  );
}

export default NavBar;