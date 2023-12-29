"use client"
import React from "react";
import MenuItem from "./MenuItems";
import "./style.css";
import "primeicons/primeicons.css";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DatasetIcon from '@mui/icons-material/Dataset';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface Props {
  roleId: string;
}

const Menu = ({ roleId }: Props) => {
  const [value, setValue] = React.useState(0);
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
                else window.location.href = "/director/ordermanager";
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Point" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Account" icon={<SupervisedUserCircleIcon />} />
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
            if (newValue == 0)
              window.location.href = "/PointManager/accountmanager";
            else window.location.href = "/PointManager/ordermanager";
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Account" icon={<SupervisedUserCircleIcon />} />
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
            window.location.href = "/Staff";
            setValue(newValue);
          }}
        >
          <BottomNavigationAction className="special" label="Có làm thì mới có ăn" icon={<PendingActionsIcon />} />
        </BottomNavigation>
      </Box>
      )}
    </div>
  );
};

export default Menu;
