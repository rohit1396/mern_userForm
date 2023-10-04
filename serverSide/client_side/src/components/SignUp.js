import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, phone, password, confirm_password } =
      user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        confirm_password: confirm_password,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Registration failed");
      console.log("registration failed");
    } else {
      window.alert("Registration Sucessfull");
      console.log("Registration successfull");
      navigate("/login");
    }
  };
  return (
    <div className="signup">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form_fields">
          {/* <label htmlFor="firstname">firstName</label> */}
          <input
            type="text"
            placeholder="firstName"
            autocomplete="off"
            onChange={handleInput}
            name="firstname"
            id="firstname"
            value={user.firstname}
          />
        </div>
        <div className="form_fields">
          {/* <label htmlFor="lastname">lastName</label> */}
          <input
            type="text"
            placeholder="lastName"
            autoComplete="off"
            onChange={handleInput}
            name="lastname"
            id="lastname"
            value={user.lastname}
          />
        </div>
        <div className="form_fields">
          {/* <label htmlFor="email">Email Id</label> */}
          <input
            type="email"
            placeholder="email"
            autoComplete="off"
            onChange={handleInput}
            name="email"
            id="email"
            value={user.email}
          />
        </div>
        <div className="form_fields">
          {/* <label htmlFor="phone">Contact No.</label> */}
          <input
            type="number"
            placeholder="Contact No."
            autoComplete="off"
            onChange={handleInput}
            name="phone"
            id="phone"
            value={user.phone}
          />
        </div>
        <div className="form_fields">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            placeholder="password"
            autoComplete="off"
            onChange={handleInput}
            name="password"
            id="password"
            value={user.password}
          />
        </div>
        <div className="form_fields">
          {/* <label htmlFor="confirm_password">Confirm Password</label> */}
          <input
            type="password"
            placeholder="confirm password"
            autoComplete="off"
            onChange={handleInput}
            name="confirm_password"
            id="confirm_password"
            value={user.confirm_password}
          />
        </div>
        <button className="signup-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
