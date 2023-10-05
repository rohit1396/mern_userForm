import React, { useState, useEffect } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const getContactPage = async () => {
    try {
      const res = await fetch("https://mern-user-form.vercel.app/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      setUserData({
        ...userData,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContactPage();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const { firstname, lastname, email, phone, message } = userData;

    const res = await fetch("https://mern-user-form.vercel.app/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        message: message,
      }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!data) {
      console.log("Message Not Send");
      alert("Message Not Send");
    } else {
      alert("Message Send Successfully");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <div>
      <section>
        <h2>{userData.firstname}</h2>
        <h2>{userData.lastname}</h2>
        <h3>{userData.email}</h3>
        <h4>{userData.phone}</h4>
      </section>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          value={userData.firstname}
          placeholder="firstname"
          onChange={handleInput}
        />
        <input
          type="text"
          name="lastname"
          value={userData.lastname}
          placeholder="lastname"
          onChange={handleInput}
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={handleInput}
        />
        <input
          type="numbert"
          name="phone"
          value={userData.phone}
          placeholder="phone"
          onChange={handleInput}
        />
        <textarea
          name="message"
          value={userData.message}
          placeholder="Enter Your Message"
          onChange={handleInput}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
