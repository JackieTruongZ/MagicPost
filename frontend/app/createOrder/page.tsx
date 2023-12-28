"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as Yup from "yup";
import "./style.css";
import axios from "axios";
import { BaseService } from "../service/BaseService";
import { Dropdown } from "primereact/dropdown";
import { PROVINCE_ENUM, CITY_DISTRICT_ENUM } from "@/public/utils/Utils";

const initialValues = {
  productName: "",
  massItem: 0,
  quantity: 0,
  descriptionItem: "",
  senderCity: "",
  senderProvince: "",
  receiverCity: "",
  receiverProvince: "",
  description: "",
  senderName: "",
  senderNumber: "",
  senderAddress: "",
  senderPostCode: "",
  receiverName: "",
  receiverNumber: "",
  receiverAddress: "",
  receiverPostCode: "",
  massOrder: "",
  typeGoods: "",
};

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  massItem: Yup.number().required("Mass Item is required"),
  quantity: Yup.number().required("Quantity is required"),
  descriptionItem: Yup.string().required("Description Item is required"),
  senderCity: Yup.string().required("Sender City is required"),
  senderProvince: Yup.string().required("Sender Province is required"),
  receiverCity: Yup.string().required("Receiver City is required"),
  receiverProvince: Yup.string().required("Receiver Province is required"),
  description: Yup.string().required("Description is required"),
  senderName: Yup.string().required("Sender Name is required"),
  senderNumber: Yup.string().required("Sender Number is required"),
  senderAddress: Yup.string().required("Sender Address is required"),
  senderPostCode: Yup.string().required("Sender Post Code is required"),
  receiverName: Yup.string().required("Receiver Name is required"),
  receiverNumber: Yup.string().required("Receiver Number is required"),
  receiverAddress: Yup.string().required("Receiver Address is required"),
  receiverPostCode: Yup.string().required("Receiver Post Code is required"),
  massOrder: Yup.string().required("Mass Order is required"),
  typeGoods: Yup.string().required("Type Goods is required"),
});

const loginEndpoint = "https://magicpost-60b7.onrender.com/order/add-order";
const access_token = "";
async function request(values: any) {
  try {
    let response = await axios.post(loginEndpoint, values, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response);
    console.log("Data posted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

const handleSubmit = async (values: any) => {
  const baseService = new BaseService();
  try {
    const createOrder = await baseService.createOrder(values);
    console.log(createOrder);
  } catch (error) {
    console.log(error);
  }
};

const FormComponent = () => {
  const [selectedSenderProvince, setSelectedSenderProvince] = useState(null);
  const [selectedSenderProvinceCode, setSelectedSenderProvinceCode] = useState<
    string | undefined
  >(undefined);

  const [selectedReceiverProvince, setSelectedReceiverProvince] =
    useState(null);
  const [selectedReceiverProvinceCode, setSelectedReceiverProvinceCode] =
    useState<string | undefined>(undefined);

  return (
    <div className="order-creation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="order-creation-form">
            <div className="p-field">
              <div className="senderName">Sender Name</div>
              <Field
                id="senderName"
                name="senderName"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="senderName"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="receiverName">Receiver Name</div>
              <Field
                id="receiverName"
                name="receiverName"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="receiverName"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="senderAddress">Sender Address</div>
              <Field
                id="senderAddress"
                name="senderAddress"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="senderAddress"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="receiverAddress">Receiver Address</div>
              <Field
                id="receiverAddress"
                name="receiverAddress"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="receiverAddress"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="senderProvince">Sender Province</div>
              <Field
                id="senderProvince"
                name="senderProvince"
                options={PROVINCE_ENUM}
                optionLabel="name_with_type"
                optionValue="name"
                className="p-dropdown"
                placeholder="Select a province"
                as={Dropdown}
                onChange={(e: any) => {
                  const senderProvince = e.value;
                  const senderProvinceCode = PROVINCE_ENUM.find(
                    (option) => option.name === senderProvince
                  )?.code;
                  setSelectedSenderProvince(senderProvince);
                  setSelectedSenderProvinceCode(senderProvinceCode);
                  setFieldValue("senderProvince", senderProvince);
                  setFieldValue("senderCity", null); // Reset the city selection when the province changes
                }}
              />
              <ErrorMessage
                name="senderProvince"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="receiverProvince">Receiver Province</div>
              <Field
                id="receiverProvince"
                name="receiverProvince"
                options={PROVINCE_ENUM}
                optionLabel="name_with_type"
                optionValue="name"
                className="p-dropdown"
                placeholder="Select a province"
                as={Dropdown}
                onChange={(e : any) => {
                  const ReceiverProvince = e.value;
                  const ReceiverProvinceCode = PROVINCE_ENUM.find(
                    (option) => option.name === ReceiverProvince
                  )?.code;
                  setSelectedReceiverProvince(ReceiverProvince);
                  setSelectedReceiverProvinceCode(ReceiverProvinceCode);
                  setFieldValue("receiverProvince", ReceiverProvince);
                  setFieldValue("receiverCity", null); // Reset the city selection when the province changes
                }}
              />
              <ErrorMessage
                name="receiverProvince"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="senderCity">Sender City</div>
              <Field
                id="senderCity"
                name="senderCity"
                options={CITY_DISTRICT_ENUM.filter(
                  (city) => city.parent_code == selectedSenderProvinceCode
                )}
                optionLabel="name_with_type" // Change 'label' to 'name'
                optionValue="name" // Change 'value' to '_id'
                className="p-dropdown"
                placeholder="Select a city"
                as={Dropdown}
              />
              <ErrorMessage
                name="senderCity"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="receiverCity">Receiver City</div>
              <Field
                id="receiverCity"
                name="receiverCity"
                options={CITY_DISTRICT_ENUM.filter(
                  (city) => city.parent_code == selectedReceiverProvinceCode
                )}
                optionLabel="name_with_type" // Change 'label' to 'name'
                optionValue="name" // Change 'value' to '_id'
                className="p-dropdown"
                placeholder="Select a city"
                as={Dropdown}
              />
              <ErrorMessage
                name="receiverCity"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field">
              <div className="senderNumber">Sender Number</div>
              <Field
                id="senderNumber"
                name="senderNumber"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="senderNumber"
                component="small"
                className="p-error"
              />
            </div>

            <div className="p-field">
              <div className="receiverNumber">Receiver Number</div>
              <Field
                id="receiverNumber"
                name="receiverNumber"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="receiverNumber"
                component="small"
                className="p-error"
              />
            </div>

            <div className="p-field">
              <div className="senderPostCode">Sender PostCode</div>
              <Field
                id="senderPostCode"
                name="senderPostCode"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="senderPostCode"
                component="small"
                className="p-error"
              />
            </div>

            <div className="p-field">
              <div className="receiverPostcode">Receiver PostCode</div>
              <Field
                id="receiverPostCode"
                name="receiverPostCode"
                type="text"
                as={InputText}
                className="p-inputtext"
              />
              <ErrorMessage
                name="receiverPostCode"
                component="small"
                className="p-error"
              />
            </div>
            <div className="package-information">
              <div className="p-field">
                <label htmlFor="productName">Product Name</label>
                <Field
                  id="productName"
                  name="productName"
                  type="text"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="productName"
                  component="small"
                  className="p-error"
                />
              </div>
              <div className="p-field">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  type="text"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="description"
                  component="small"
                  className="p-error"
                />
              </div>
              <div className="p-field">
                <label htmlFor="massOrder">Mass Order</label>
                <Field
                  id="massOrder"
                  name="massOrder"
                  type="text"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="massOrder"
                  component="small"
                  className="p-error"
                />
              </div>
              <div className="p-field">
                <label htmlFor="typeGoods">Type Goods</label>
                <Field
                  id="typeGoods"
                  name="typeGoods"
                  type="text"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="typeGoods"
                  component="small"
                  className="p-error"
                />
              </div>
              <div className="p-field">
                <label htmlFor="quantity">Quantity</label>
                <Field
                  id="quantity"
                  name="quantity"
                  type="number"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="quantity"
                  component="small"
                  className="p-error"
                />
              </div>
              <div className="p-field">
                <label htmlFor="descriptionItem">Description Item</label>
                <Field
                  id="descriptionItem"
                  name="descriptionItem"
                  type="text"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="descriptionItem"
                  component="small"
                  className="p-error"
                />
              </div>
              <div className="p-field">
                <label htmlFor="massItem">Mass Item</label>
                <Field
                  id="massItem"
                  name="massItem"
                  type="number"
                  as={InputText}
                  className="p-inputtext"
                />
                <ErrorMessage
                  name="massItem"
                  component="small"
                  className="p-error"
                />
              </div>
            </div>
            <div className="submit-button mt-4">
              <Button
                type="submit"
                label="Submit"
                className="p-button p-component"
              />
            </div>
          </Form>
        )}
      </Formik>
      {/* <img
        className="create-order-image"
        alt="Order Creation image"
        src="./asset/create-order-image.png"
      /> */}
    </div>
  );
};

export default FormComponent;
