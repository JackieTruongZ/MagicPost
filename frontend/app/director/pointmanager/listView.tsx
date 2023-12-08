import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PROVINCE_ENUM } from '../../../public/utils/Utils';

function ListView() {
  const handleRowClick = (rowData: any) => {
    window.location.href = `/director/pointmanager/province/${rowData.data.code}`;
  };

  const getRowClassName = (data: any) => {
    // Return the desired class name based on the row data
    return 'row-clickable';
  };

  return (
    <div>
      <DataTable
        value={PROVINCE_ENUM}
        tableStyle={{ minWidth: '50rem' }}
        rowClassName={getRowClassName}
        onRowClick={handleRowClick}
        className='cursor-pointer'
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="code" header="Code"></Column>
      </DataTable>
    </div>
  );
}

export default ListView;