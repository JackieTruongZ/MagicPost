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

const validationSchema = Yup.object().shape({
  grantAccess: Yup.boolean().oneOf([true], 'Grant access is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  employeeType: Yup.string().required('Employee type is required'),
});

const initialValues = {
  username: '',
  email: '',
  employeeType: '',
};

const employeeTypes = [
  { label: 'Normal Employee', value: '1' },
  { label: 'Outstanding Employee', value: '2' },
  { label: 'Boss', value: '3' },
];

const loginData = {
    email: "huynhnhu@gmail.com",
    password: "12345678"
}

const loginEndpoint = "https://magicpost-60b7.onrender.com/auth/signin";
async function request() {
  try {
    let res = await axios.post(loginEndpoint, loginData);
      console.log(res);
  } catch(error) {
    console.error("error message: " + error.message);
    alert(`Email: ${loginData.email} \nPassword: 12345678`);
  } 
}

export default function MyForm() {
  const handleSubmit = (values, { setSubmitting }) => {
    // Gửi dữ liệu nếu hợp lệ
    console.log('Form submitted:', values);

    //Dùng axios để gọi API
    request();

    setSubmitting(false);
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
          <label htmlFor="employeeType">Employee Type</label>
          <Field
            id="employeeType"
            name="employeeType"
            options={employeeTypes}
            optionLabel="label"
            optionValue="value"
            className="p-dropdown"
            placeholder="Select an employee type"
            as={Dropdown}
          />
          <ErrorMessage name="employeeType" component="small" className="p-error" />
        </div>

        <Button type="submit" label="Submit" className="p-button p-component" />
      </Form>
    </Formik>
  );
};

