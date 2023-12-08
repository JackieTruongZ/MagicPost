'use client'
import Container from "@/app/components/Container";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import './style.css';
import Menu from "./Menu";

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername: string | null = window.localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="h-auto w-full fixed z-999 top-0 left-0">
      <Container>
        <div className="nav h-5rem relative">
          <div className="nav-title m-4 flex absolute left-0"> <p> MagicPost</p> </div>
          {/* <div id="pig" className="pig m-10"></div> */}
          <Menu/>
          <UserMenu username={username} />
        </div>
      </Container>
    </div>
  );
}
export default NavBar;