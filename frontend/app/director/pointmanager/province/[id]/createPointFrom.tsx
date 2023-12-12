import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import 'primeflex/primeflex.css';
import * as Yup from 'yup';
import { BaseService } from '@/app/service/BaseService';
import { CITY_DISTRICT_ENUM, PROVINCE_ENUM } from '@/public/utils/Utils';
import { Toast } from 'primereact/toast';
import { AddressDistrict, AddressProvince, PointForm } from '@/public/utils/interface';

interface Props {
  point: string;
  closeCreateForm: any;
}

const CreatePointForm = ({ point, closeCreateForm }: Props) => {

  const [selectedProvince, setSelectedProvince] = useState<AddressProvince | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<AddressDistrict | null>(null);
  const toast = useRef<Toast | null>(null);
  const baseService: BaseService = new BaseService();

  const initialValues = {
    name: '',
    province: '',
    cityDistrict: '',
    address: '',
    numberPhone: '',
    status: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required.'),
    province: Yup.string().required('This field is required.'),
    cityDistrict: Yup.string().required('This field is required.'),
    address: Yup.string().required('This field is required.'),
    numberPhone: Yup.string().required('This field is required.'),
    status: Yup.string().required('This field is required.'),
  });

  const onSubmit = async (values: PointForm) => {
    console.log(values);
    try {
      if (point === 'trans') {
        const res = await baseService.createTrans(values);
        console.log(res);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Create trans success !' });
        closeCreateForm();
      }
      if (point === 'hub') {
        const res = await baseService.createHub(values);
        console.log(res);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Create hub success !' });
        closeCreateForm();
      }
    } catch (error) {
      console.log(error);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Have a error when create Trans Hub !' });
    }
    setSelectedProvince(null);
    setSelectedDistrict(null);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  const provinceOptions = PROVINCE_ENUM.map((province) => ({
    label: province.name,
    value: province,
  }));

  const districtOptions = selectedProvince
    ? CITY_DISTRICT_ENUM
      .filter((district) => district.parent_code === selectedProvince.code)
      .map((district) => ({
        label: district.name,
        value: district,
      }))
    : [];


  return (
    <div> <Toast ref={toast} />
      <form onSubmit={formik.handleSubmit} className="grid">
        <div className="col-12 lg:col-6">
          <label htmlFor="name">Name</label>
          <InputText id="name" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && (
            <span>{formik.errors.name}</span>
          )}
        </div>

        <div className="col-12 lg:col-6">
          <label htmlFor="province">Province</label>
          <Dropdown
            id="province"
            options={provinceOptions}
            value={selectedProvince}
            onChange={(e) => {
              formik.setFieldValue('province', e.value?.name ?? ''); // Set the province field value
              setSelectedProvince(e.value as AddressProvince);
              setSelectedDistrict(null); // Reset the selected district when province changes
            }}
            placeholder="Select a province"
          />
          {formik.touched.province && formik.errors.province && (
            <span>{formik.errors.province}</span>
          )}
        </div>

        <div className="col-12 lg:col-6">
          <label htmlFor="cityDistrict">City/District</label>
          <Dropdown
            id="cityDistrict"
            options={districtOptions}
            value={selectedDistrict}
            onChange={(e) => {
              formik.setFieldValue('cityDistrict', e.value?.name ?? ''); // Set the cityDistrict field value
              setSelectedDistrict(e.value as AddressDistrict);
            }}
            placeholder="Select a city/district"
            disabled={!selectedProvince}
          />
          {formik.touched.cityDistrict && formik.errors.cityDistrict && (
            <span>{formik.errors.cityDistrict}</span>
          )}
        </div>

        <div className="col-12 lg:col-6">
          <label htmlFor="address">Address</label>
          <InputText id="address" {...formik.getFieldProps('address')} />
          {formik.touched.address && formik.errors.address && (
            <span>{formik.errors.address}</span>
          )}
        </div>

        <div className="col-12 lg:col-6">
          <label htmlFor="numberPhone">Phone Number</label>
          <InputText
            id="numberPhone"
            {...formik.getFieldProps('numberPhone')}
          />
          {formik.touched.numberPhone && formik.errors.numberPhone && (
            <span>{formik.errors.numberPhone}</span>
          )}
        </div>

        <div className="col-12 lg:col-6">
          <label htmlFor="status">Status</label>
          <Dropdown
            id="status"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
            {...formik.getFieldProps('status')}
          />
          {formik.touched.status && formik.errors.status && (
            <span>{formik.errors.status}</span>
          )}
        </div>

        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
};

export default CreatePointForm;