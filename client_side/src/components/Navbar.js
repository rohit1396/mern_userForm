import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const navigate = useNavigate();
  // const logout = async () => {
  //   try {
  //     const res = await fetch("/logout", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     const data = await res.json();
  //     navigate("/login");

  //     if (res.status !== 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <header className="navbar">
      <div className="nav-logo">
        <Link to="https://mern-user-form.vercel.app/">
          <span>UserForm</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="https://mern-user-form.vercel.app/">
          <span>Home</span>
        </Link>
        <Link to="https://mern-user-form.vercel.app/about">
          <span>About</span>
        </Link>
        <Link to="https://mern-user-form.vercel.app/contact">
          <span>Contact</span>
        </Link>
        <Link to="https://mern-user-form.vercel.app/login">
          <span>Login</span>
        </Link>
        <Link to="https://mern-user-form.vercel.app/signup">
          <span>Sign Up</span>
        </Link>
        <Link to="https://mern-user-form.vercel.app/logout">
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
