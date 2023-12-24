"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./MyForm.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { BaseService } from '../service/BaseService';

// Kiểm tra điều kiện các ô input, nhập sai thì ra chữ đỏ
const validationSchema = Yup.object().shape({
  grantAccess: Yup.boolean().oneOf([true], 'Grant access is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  roleId: Yup.string().required('Employee type is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

//initial values cho formik
const initialValues = {
  username: '',
  email: '',
  roleId: '',
  firstName: '',
  lastName: '',
};

//các role id
const roleId = [
  { value: 7, label: 'customer' },
  { value: 5, label: 'CEO' },
  { value: 51, label: 'Transaction Manager' },
  { value: 52, label: 'Hub Manager' },
  { value: 511, label: 'Trans staff' },
  { value: 512, label: 'driver staff' },
  { value: 521, label: 'hub staff' },
];

// const loginEndpoint = "https://magicpost-60b7.onrender.com/users/create-user";
// const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiaHV5bmhuaHVAZ21haWwuY29tIiwiaWF0IjoxNzAyMDMwMjY5LCJleHAiOjE3MDIwMzM4Njl9.CjqnshRVtUKp4P8-PcbwfFexePrTUc4yNLoUDaKiTCQ";

async function request(values: any) {
  const baseService = new BaseService();
  try {
    let res = await baseService.createUser(values)
    console.log(res);
    if (res.status == 201) {
      Swal.fire({
        title: "Good job!",
        text: "Khoi tao thanh cong",
        icon: "success"
      });
    }
  } catch (error:any) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Something went wrong! ${error.response.data.message}`
    });
  }
}

export default function MyForm() {
  const handleSubmit = (values: any,) => {
    // Gửi dữ liệu nếu hợp lệ
    console.log('Form submitted:', values);

    //Dùng axios để gọi API
    request(values);

    // setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <span className='form-name'>Grant Access</span>
        <div className="p-field">
          <label htmlFor="firstName">First Name</label>
          <Field
            id="firstName"
            name="firstName"
            type="text"
            as={InputText}
            className="p-inputtext"
          />
          <ErrorMessage name="firstName" component="small" className="p-error" />
        </div>
        <div className="p-field">
          <label htmlFor="lastName">Last Name</label>
          <Field
            id="lastName"
            name="lastName"
            type="text"
            as={InputText}
            className="p-inputtext"
          />
          <ErrorMessage name="lastName" component="small" className="p-error" />
        </div>
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <Field
            id="username"
            name="username"
            type="text"
            as={InputText}
            className="p-inputtext"
          />
          <ErrorMessage name="username" component="small" className="p-error" />
        </div>

        <div className="p-field">
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            type="text"
            as={InputText}
            className="p-inputtext"
          />
          <ErrorMessage name="email" component="small" className="p-error" />
        </div>

        <div className="p-field">
          <label htmlFor="roleId">Employee Type</label>
          <Field
            id="roleId"
            name="roleId"
            options={roleId}
            optionLabel="label"
            optionValue="value"
            className="p-dropdown"
            placeholder="Select an employee type"
            as={Dropdown}
          />
          <ErrorMessage name="roleId" component="small" className="p-error" />
        </div>
        <div className='button'>
          <Button type="submit" label="Submit" />
        </div>

      </Form>
    </Formik>
  );
};

