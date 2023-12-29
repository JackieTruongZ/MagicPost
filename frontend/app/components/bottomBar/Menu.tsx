"use client"
import React, { useEffect } from "react";
import MenuItem from "./MenuItems";
import "./style.css";
import "primeicons/primeicons.css";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DatasetIcon from '@mui/icons-material/Dataset';
import { usePathname } from "next/navigation";
import path from "path";

interface Props {
  roleId: string;
}

const Menu = ({ roleId }: Props) => {
  const [value, setValue] = React.useState(0);
  const pathname: string = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (roleId == '5' && pathname.slice(10, 22) == 'pointmanager') {
      setValue(0);
    }

    if (roleId == '5' && pathname.slice(-14) == 'accountmanager') {

      setValue(1);
    }

    if (roleId == '5' && pathname.slice(-12) == 'ordermanager') {
      setValue(2);
    }



  }, [roleId])

  return (
    <div className="h-full align-items-center justify-content-center ">
      {roleId == "5" && (
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              if (newValue == 0)
                window.location.href = "/director/pointmanager";
              else if (newValue == 1)
                window.location.href = "/director/accountmanager";
              else window.location.href = "/PointManager/ordermanager";
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Point" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Order" icon={<DatasetIcon />} />
          </BottomNavigation>
        </Box>
      )}

      {["51", "52"].includes(roleId) && (
        <div className="h-full flex flex-row">
          <MenuItem
            onClick={() => {
              window.location.href = "/PointManager/accountmanager";
            }}
          >
            <div>
              <p>Account</p>
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location.href = "/PointManager/ordermanager";
            }}
          >
            <div>
              <p>Order</p>
            </div>
          </MenuItem>
        </div>
      )}

      {["511", "512", "521"].includes(roleId) && (
        <div className="h-full">
          <MenuItem
            onClick={() => {
              window.location.href = "/Staff";
            }}
          >
            <div>
              <p style={{ width: "max-content" }}>Làm việc thôi</p>
            </div>
          </MenuItem>
        </div>
      )}
    </div>
  );
};

export default Menu;