"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import "./style2.css"; // Import the CSS file
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { BaseService } from '../service/BaseService';
import { Toast } from 'primereact/toast';
import { UserRolePointInfor } from '@/public/utils/interface';


const LogIn = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const baseService = new BaseService();
  const toast = useRef<Toast | null>(null);

  const isValidEmail = (email: any) => {
    // Regex pattern for email validation
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Trim the input email to remove leading and trailing spaces
    const trimmedEmail = email.trim();

    return emailPattern.test(trimmedEmail);
  };

  const handleEmailBlur = () => {
    if (!emailValue) {
      setEmailError("Email is required");
    } else if (!isValidEmail(emailValue)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!passwordValue) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const emailValidation = () => {
    if (!emailValue) {
      return "Email is required";
    } else if (!isValidEmail(emailValue)) {
      return "Invalid email";
    }
    return '';
  }

  const passwordValidation = () => {
    if (!passwordValue) {
      return "Password is required";
    }
    return "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const emailErrorText = emailValidation();
    const passwordErrorText = passwordValidation();

    setEmailError(emailErrorText);
    setPasswordError(passwordErrorText);

    // Check if either email or password is empty
    if (!emailValue || !passwordValue) {
      return;
    }

    // Handle form submission logic here
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);

    // call api 

    const formLogin: any = {
      email: emailValue,
      password: passwordValue,
    };
    try {
      const login = await baseService.login(formLogin);
      if (login.data.status === 'OK') {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Login Success' });
        window.localStorage.setItem('access_token', login.data.data.access_token);
        const resUserInfor: any = await baseService.getUser();
        if (resUserInfor.status == 200) {
          const userInfor: UserRolePointInfor = resUserInfor.data.data;
          window.localStorage.setItem('username', userInfor.user.username);
          window.localStorage.setItem('firstname', userInfor.user.firstName);
          window.localStorage.setItem('lastname', userInfor.user.lastName);
          window.localStorage.setItem('roleId', userInfor.userRole.roleId.toString());
          if (userInfor.userPoint.transId == '404') {
            window.localStorage.setItem('point', userInfor.userPoint.hubId);
            window.localStorage.setItem('pointType', 'HubPoint');
          }
          if (userInfor.userPoint.hubId == '404') {
            window.localStorage.setItem('point', userInfor.userPoint.transId);
            window.localStorage.setItem('pointType', 'TransactionPoint');
          }
          window.localStorage.setItem('type', userInfor.userPoint.type.toString());
        }

        setTimeout(() => { window.location.href = '/dashboard' }, 1000);
      } else {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: `${login.data.message}` });
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `login error`,
      });
    }

    // Reset form values
    setEmailValue("");
    setPasswordValue("");
    setEmailError("");
    setPasswordError("");
  };

  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e: any) => {
    setPasswordValue(e.target.value);
    setPasswordError("");
  };

  return (
    <div className="log-in ">
      <Toast ref={toast} />
      <div className="login-form m-2">
        <div className="text-wrapper mb-5">Log In</div>

        <form onSubmit={handleSubmit}>
          <div className="email mb-5">
            <div className="text-wrapper-2">Email</div>
            <div className="card flex justify-content-center mt-2">
              <InputText
                className="email-content"
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Enter email"
              />
            </div>
            {emailError && (
              <div className="email-error-message mt-1">{emailError}</div>
            )}
          </div>

          <div className="password mb-5">
            <div className="text-wrapper-2 mb-2">Password</div>
            <Link href="" className="text-wrapper-3">
              Forgot Password?
            </Link>
            <div className="card flex justify-content-center mt-2">
              <Password
                className="password-content"
                value={passwordValue}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                feedback={false}
                tabIndex={1}
                placeholder="Enter password"
              />
            </div>
            {passwordError && <div className="password-error-message mt-1">{passwordError}</div>}
          </div>
        </form>
        <div className="login-button" >
          <Button label="Log In" type="submit" onClick={(e) => { handleSubmit(e) }} />
        </div>
      </div>
      <img
        className="log-in-image"
        alt="Log in image"
        src="./asset/login-image.png"
      />
    </div>
  );
};

export default LogIn;
