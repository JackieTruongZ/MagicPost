'use client'
import React from 'react'
import FindOrder from './FindOrder';
import ResultTable from './ResultTable';
import { useState } from 'react';

function Dashboard() {
  const [result_table_data, set_result_table_data] = useState(null);
  return (
    <div>
      <FindOrder childState={result_table_data} setChildState={set_result_table_data}></FindOrder>
      <ResultTable childState={result_table_data} setChildState={set_result_table_data}></ResultTable>
    </div>
  )
}

export default Dashboard;