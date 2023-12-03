'use client'
import Container from "@/app/components/Container";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import './style.css';

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername: string | null = window.localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
  <div className="h-auto">
    <Container>
      <div className="nav h-5rem">
      <div className="nav-title m-4"> <p> MagicPost</p> </div>
      <UserMenu username={username}/>
      </div>
    </Container>
  </div>
  );
}
export default NavBar;