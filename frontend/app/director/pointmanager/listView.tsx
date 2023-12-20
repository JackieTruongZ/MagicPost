import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PROVINCE_ENUM } from '../../../public/utils/Utils';

const ListView = () => {
  const handleRowClick = (rowData: any) => {
    window.location.href = `/director/pointmanager/province/${rowData.data.code}`;
  };

  return (
    <div className="card">
      <DataTable value={PROVINCE_ENUM} onRowClick={handleRowClick} stripedRows className='cursor-pointer listview' tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Id"></Column>
        <Column field="name" header="Tên"></Column>
        <Column field="name_with_type" header="Tên đầy đủ"></Column>
      </DataTable>
    </div>

  );
}

export default ListView;