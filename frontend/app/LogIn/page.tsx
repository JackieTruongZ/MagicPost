'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './style.css'; // Import the CSS file
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';




const LogIn = () => {
  // Your component logic here
  const [usernameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  return (
    <div className="log-in">
      <div className="div">
        <div className="login-form">
          <div className="text-wrapper">Log In</div>
          <div className="username-or-email">
            <div className="text-wrapper-2">Email</div>
            <div className="card flex justify-content-center" >
              <InputText
                className="username-content"
                value={usernameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
                placeholder="Enter username"
              />
            </div>
          </div>
          <div className="password">
            <div className="text-wrapper-2">Password</div>
            <div className="card flex justify-content-center" >
              <Password
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                feedback={false}
                tabIndex={1}
                placeholder="Enter password"
              />

            </div>


            <Link href="" className="text-wrapper-3">Forgot Password?</Link>
          </div>
          <div className="login-button">
            <div className="overlap-group">
              <div className="card flex justify-content-center">
                <Button label="Log In" />
              </div>
            </div>
          </div>
        </div>
        <img className="log-in-image" alt="Log in image" src="./asset/log-in-img.png" />
        <header className="header">
          <div className="overlap">
            <div className="logo-and-log-in-box" />
            <div className="logo">
              <div className="website-name">MAGICPOST</div>
              <img className="website-logo" alt="Website logo" src="website-logo.svg" />
            </div>
            <div className="overlap-group-wrapper">
              <div className="div-wrapper">
                <div className="text-wrapper-5">Log In</div>
              </div>
            </div>
          </div>
        </header>
      </div>

    </div>

  );
};

export default LogIn;