import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        navigate("/login");

        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>User Loggoed Out</h3>
      <h4>You need to login</h4>
      <button>
        <NavLink to="/signin">Log In</NavLink>
      </button>
    </div>
  );
};

export default Logout;
