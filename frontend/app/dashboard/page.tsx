import React from 'react'
import FindOrder from './FindOrder';
import ResultTable from './ResultTable';

function Dashboard() {
  return (
    <div>
      <FindOrder/>
      <ResultTable></ResultTable>
    </div>
  )
}

export default Dashboard;