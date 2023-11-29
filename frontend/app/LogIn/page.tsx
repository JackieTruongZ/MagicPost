'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './style.css'; // Import the CSS file
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { log } from 'console';
import { lockfilePatchPromise } from 'next/dist/build/swc';




const LogIn = () => {
  // Your component logic here
  const [usernameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [value, setValue] = useState<string>('');

  const Login = (username: string, password: string) => {
        // validate
        if(username == "" || password == "") {
          // thong bao 
          console.log("chua nhap username password");
          
        } else {
          console.log(username);
        console.log(password);
        
          
        }

        // call API
  }

  useEffect(() => {
    Login(usernameValue,passwordValue);
  },[usernameValue,passwordValue]); 

  return (
    <div className="log-in ">
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
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
                <Button label="Log In" onClick={()=> {Login(usernameValue,passwordValue);}}/>
              </div>
            </div>
          </div>

        </div>
        <div className="col-12 md:col-6 lg:col-3">
        <img className="log-in-image" alt="Log in image" src="./asset/log-in-img.png" />
        </div>
       
      </div>

  


    </div>

  );
};

export default LogIn;

