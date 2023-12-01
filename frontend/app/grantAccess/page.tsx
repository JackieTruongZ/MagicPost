"use client";
import React, { useState, Fragment, useEffect } from "react";
import Header from "../components/Header";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./style.css";
import MyForm from "../testPage/page";

export default function grantAccess() {
  return (
    <Fragment>
      <Header></Header>
      <div className="main-content">
        <div className="login-block">
          <MyForm/>
        </div>

        <img
          src="/asset/log-in-img.png"
          alt="login-image"
          className="loginImage"
        />
      </div>
    </Fragment>
  );
}
