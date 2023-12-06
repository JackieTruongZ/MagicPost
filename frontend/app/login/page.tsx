'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './style.css'; // Import the CSS file
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const LogIn = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleEmailBlur = () => {
    if (!emailValue) {
      setEmailError('Email is required');
    } else if (!isValidEmail(emailValue)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (!passwordValue) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
  
    let emailErrorText = '';
    let passwordErrorText = '';
  
    // Perform email validation
    if (!emailValue) {
      emailErrorText = 'Email is required';
    } else if (!isValidEmail(emailValue)) {
      emailErrorText = 'Invalid email';
    }
  
    // Perform password validation
    if (!passwordValue) {
      passwordErrorText = 'Password is required';
    }
  
    setEmailError(emailErrorText);
    setPasswordError(passwordErrorText);
  
    // Check if either email or password is empty
    if (!emailValue || !passwordValue) {
      return;
    }
  
    // Handle form submission logic here
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);
  
    // Reset form values
    setEmailValue('');
    setPasswordValue('');
    setEmailError('');
    setPasswordError('');
  };

  const handleEmailChange = (e:any) => {
    setEmailValue(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e:any) => {
    setPasswordValue(e.target.value);
    setPasswordError('');
  };

  const isValidEmail = (email : any) => {
    // Regex pattern for email validation
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    // Trim the input email to remove leading and trailing spaces
    const trimmedEmail = email.trim();
  
    return emailPattern.test(trimmedEmail);
  };

  return (
    <div className="log-in">
      <header className="test-header">Header</header>
      <div className="login-form">

        <div className="text-wrapper">Log In</div>

        <form onSubmit={handleSubmit}>
          <div className="email">
            <div className="text-wrapper-2">Email</div>
            <div className="card flex justify-content-center">
              <InputText
                className="email-content"
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Enter email"
              />
            </div>
            {emailError && <div className="email-error-message">{emailError}</div>}
          </div>
          
          <div className="password">
            <div className="text-wrapper-2">Password</div>
            <div className="card flex justify-content-center">
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
            {passwordError && <div className="password-error-message">{passwordError}</div>}
            <Link href="" className="text-wrapper-3">Forgot Password?</Link>
          </div>
        </form>
        <div className="login-button">
          <Button label="Log In" type="submit" />
        </div>
      </div>
<Button>hello</Button>
      <img className="log-in-image" alt="Log in image" src="./asset/login-image.png" />
    </div>
  );
};

export default LogIn;