import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const getAboutPage = async () => {
    try {
      const res = await fetch("https://mern-user-form.vercel.app/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("https://mern-user-form.vercel.app/login");
    }
  };

  useEffect(() => {
    getAboutPage();
  }, []);

  return (
    <div>
      <h2>{userData.firstname}</h2>
      <h2>{userData.lastname}</h2>
      <h3>{userData.email}</h3>
      <h4>{userData.phone}</h4>
    </div>
  );
};

export default About;
