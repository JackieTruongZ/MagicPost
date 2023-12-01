"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import "../componentStyle/MyForm.css"

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const initialValues = {
  username: '',
  email: '',
};

const MyForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Gửi dữ liệu nếu hợp lệ
    console.log('Form submitted:', values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <Field
            id="username"
            name="username"
            type="text"
            as={InputText}
            className="p-inputtext"
            placeholder="enter name"
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

        <Button type="submit" label="Submit" className="p-button p-component" />
      </Form>
    </Formik>
  );
};

export default MyForm;