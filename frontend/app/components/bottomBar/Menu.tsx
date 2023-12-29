"use client";
import React, { useEffect } from "react";
import MenuItem from "./MenuItems";
import "./style.css";
import "primeicons/primeicons.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DatasetIcon from "@mui/icons-material/Dataset";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
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
    else if (roleId == "5" && pathname.slice(10, 22) == "pointmanager") {
      setValue(1);
    }

    else if (roleId == "5" && pathname.slice(-14) == "accountmanager") {
      setValue(2);
    }

    else if (roleId == "5" && pathname.slice(-12) == "ordermanager") {
      setValue(3);
    }
    else if (pathname.slice(-9) == "dashboard")
     setValue(0);
    else if (["51", "52"].includes(roleId) && pathname.slice(-14) == "accountmanager")
    setValue(1);
    else if (["51", "52"].includes(roleId) && pathname.slice(-12) == "ordermanager")
    setValue(2);
  else setValue(1);
  }, [roleId]);

  return (
    <div className="h-full align-items-center justify-content-center ">
      {roleId == "5" && (
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              if (newValue == 1)
                window.location.href = "/director/pointmanager";
              else if (newValue == 2)
                window.location.href = "/director/accountmanager";
              else if (newValue == 0) window.location.href = "/dashboard";
              else window.location.href = "/director/ordermanager";
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Point" icon={<LocationOnIcon />} />
            <BottomNavigationAction
              label="Account"
              icon={<SupervisedUserCircleIcon />}
            />
            <BottomNavigationAction label="Order" icon={<DatasetIcon />} />
          </BottomNavigation>
        </Box>
      )}

      {["51", "52"].includes(roleId) && (
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              if (newValue == 1)
                window.location.href = "/PointManager/accountmanager";
              else if (newValue == 0) window.location.href = "/dashboard";
              else window.location.href = "/PointManager/ordermanager";
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction
              label="Account"
              icon={<SupervisedUserCircleIcon />}
            />
            <BottomNavigationAction label="Order" icon={<DatasetIcon />} />
          </BottomNavigation>
        </Box>
      )}

      {["511", "512", "521"].includes(roleId) && (
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              if (newValue == 0) window.location.href = "/dashboard";
              else window.location.href = "/Staff";
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction
              className="special"
              label="Staff"
              icon={<PendingActionsIcon />}
            />
          </BottomNavigation>
        </Box>
      )}
    </div>
  );
};

export default Menu;
