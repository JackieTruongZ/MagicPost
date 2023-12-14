"use client"
import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PROVINCE_ENUM, viewType } from '../../../public/utils/Utils';
import { Dropdown } from 'primereact/dropdown';
import ListView from './listView';
import GridView from './gridView';
import './style.css';

function PointManager() {
  const [view, setView] = useState(viewType.at(1)?.value);
  return (
    <div>
      <p>PointManager</p>
      <Dropdown
        id="userType"
        value={view}
        options={viewType}
        onChange={(e) => setView(e.target.value)}
        placeholder="List view"
      />
      {
        view === viewType.at(1)?.value ? (
          <ListView/>
        ) : (
          <GridView/>
        )
      }
    </div>
  )
}

export default PointManager