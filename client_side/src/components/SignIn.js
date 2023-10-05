import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://mern-user-form.vercel.app/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Login Failed");
    } else {
      window.alert("Login Successfully");
      navigate("https://mern-user-form.vercel.app/");
    }
  };
  return (
    <div className="signin">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form_fields">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email Id"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_fields">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
