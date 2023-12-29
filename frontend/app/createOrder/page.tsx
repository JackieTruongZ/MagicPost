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
  massItem: Yup.string()
    .matches(/^(?!-)\d+$/, "Quantity must be a non-negative integer")
    .required("Mass Item is required"),
  quantity: Yup.string()
    .matches(/^(?!-)\d+$/, "Quantity must be a non-negative integer")
    .required("Quantity is required"),
  descriptionItem: Yup.string().required("Description Item is required"),
  senderCity: Yup.string().required("Sender City is required"),
  senderProvince: Yup.string().required("Sender Province is required"),
  receiverCity: Yup.string().required("Receiver City is required"),
  receiverProvince: Yup.string().required("Receiver Province is required"),
  description: Yup.string().required("Description is required"),
  senderName: Yup.string().required("Sender Name is required"),
  senderNumber: Yup.string()
    .matches(/^(09|03|08|07|05)\d{8}$/, "Invalid phone number")
    .required("Sender Number is required"),
  senderAddress: Yup.string().required("Sender Address is required"),
  senderPostCode: Yup.string().required("Sender Post Code is required"),
  receiverName: Yup.string().required("Receiver Name is required"),
  receiverNumber: Yup.string()
    .matches(/^(09|03|08|07|05)\d{8}$/, "Invalid phone number")
    .required("Receiver Number is required"),
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
  const [selectedSenderCity, setSelectedSenderCity] = useState(null);

  const [selectedReceiverProvince, setSelectedReceiverProvince] =
    useState(null);
  const [selectedReceiverCity, setSelectedReceiverCity] = useState(null);
  const [selectedReceiverProvinceCode, setSelectedReceiverProvinceCode] =
    useState<string | undefined>("");

  return (
    <div className="order-creation">
      <div className="form-name ml-8">Order Form</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="order-creation-form grid ml-8 mr-8 mt-4">
            <div className="p-field col-12 md:col-5 col-offset-1 mt-4">
              <div className="senderName mb-1">Sender Name</div>
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
            <div className="p-field col-12 md:col-5 col-offset-1 mt-4">
              <div className="receiverName mb-1">Receiver Name</div>
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
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="senderAddress mb-1">Sender Address</div>
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
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="receiverAddress mb-1">Receiver Address</div>
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
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="senderProvince mb-1">Sender Province</div>
              <Dropdown
                id="senderProvince"
                name="senderProvince"
                value={selectedSenderProvince}
                onChange={(e) => {
                  const selectedSenderProvince = e.value;
                  const selectedSenderProvinceCode = PROVINCE_ENUM.find(
                    (province) => province.name === selectedSenderProvince.name
                  )?.code;

                  setSelectedSenderProvince(selectedSenderProvince);
                  setSelectedSenderProvinceCode(selectedSenderProvinceCode);
                  setFieldValue("senderProvince", selectedSenderProvince.name);
                  setFieldValue("senderCity", null);
                  // Reset the city selection when the province changes
                }}
                options={PROVINCE_ENUM}
                optionLabel="name_with_type"
                placeholder="Select a Province"
              />
              <ErrorMessage
                name="senderProvince"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="receiverProvince mb-1">Receiver Province</div>
              <Dropdown
                id="receiverProvince"
                name="receiverProvince"
                value={selectedReceiverProvince}
                onChange={(e) => {
                  const selectedReceiverProvince = e.value;
                  const selectedReceiverProvinceCode = PROVINCE_ENUM.find(
                    (province) =>
                      province.name === selectedReceiverProvince.name
                  )?.code;

                  setSelectedReceiverProvince(selectedReceiverProvince);
                  setSelectedReceiverProvinceCode(selectedReceiverProvinceCode);
                  setFieldValue(
                    "receiverProvince",
                    selectedReceiverProvince.name
                  );
                  setFieldValue("receiverCity", null);
                  // Reset the city selection when the province changes
                }}
                options={PROVINCE_ENUM}
                optionLabel="name_with_type"
                placeholder="Select a Province"
              />
              <ErrorMessage
                name="receiverProvince"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="senderCity mb-1">Sender City</div>
              <Dropdown
                id="senderCity"
                name="senderCity"
                value={selectedSenderCity}
                onChange={(e) => {
                  const selectedSenderCity = e.value;
                  setSelectedSenderCity(selectedSenderCity);
                  setFieldValue("senderCity", selectedSenderCity.name);
                }}
                options={CITY_DISTRICT_ENUM.filter(
                  (city) => city.parent_code == selectedSenderProvinceCode
                )}
                optionLabel="name_with_type"
                placeholder="Select a city"
              />
              <ErrorMessage
                name="senderCity"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="receiverCity mb-1">Receiver City</div>
              <Dropdown
                id="receiverCity"
                name="receiverCity"
                value={selectedReceiverCity}
                onChange={(e) => {
                  const selectedReceiverCity = e.value;
                  setSelectedReceiverCity(selectedReceiverCity);
                  setFieldValue("receiverCity", selectedReceiverCity.name);
                }}
                options={CITY_DISTRICT_ENUM.filter(
                  (city) => city.parent_code == selectedReceiverProvinceCode
                )}
                optionLabel="name_with_type"
                placeholder="Select a city"
              />
              <ErrorMessage
                name="receiverCity"
                component="small"
                className="p-error"
              />
            </div>
            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="senderNumber mb-1">Sender Number</div>
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

            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="receiverNumber mb-1">Receiver Number</div>
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

            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="senderPostCode mb-1">Sender PostCode</div>
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

            <div className="p-field col-12 md:col-5 col-offset-1">
              <div className="receiverPostcode mb-1">Receiver PostCode</div>
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

            <div className="p-field col-12 text-center">
              <div className="productName mb-1">Product Name</div>
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
            <div className="p-field col-12 text-center">
              <div className="description mb-1">Description</div>
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
            <div className="p-field col-12 text-center">
              <div className="massOrder mb-1">Mass Order</div>
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
            <div className="p-field col-12 text-center">
              <div className="typeGoods mb-1">Type Goods</div>
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
            <div className="p-field col-12 text-center">
              <div className="quantity mb-1">Quantity</div>
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
            <div className="p-field col-12 text-center">
              <div className="descriptionItem mb-1">Description Item</div>
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
            <div className="p-field col-12 text-center">
              <div className="massItem mb-1">Mass Item</div>
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
            <div className="submit-button col-12 mb-4">
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
