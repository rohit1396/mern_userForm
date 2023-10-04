const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Authenticate = require("../middleware/authenticate");

require("../db/connect");
const UserDetails = require("../models/userlist");

router.get("/", (req, res) => {
  res.send("Router Page");
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, phone, password, confirm_password } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !confirm_password
  ) {
    return res.status(422).json({ error: "Empty Fields" });
  }

  try {
    const existItem = await UserDetails.findOne({ email: email });

    if (existItem) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== confirm_password) {
      res.status(422).json({ error: "Password not matching" });
    } else {
      const user = new UserDetails({
        firstname,
        lastname,
        email,
        phone,
        password,
        confirm_password,
      });

      const registeredUser = await user.save();
      res.status(201).json({ message: "Registered User Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    const getUser = await UserDetails.findOne({ email: email });
    console.log(getUser);

    if (getUser) {
      const isMatch = await bcrypt.compare(password, getUser.password);
      console.log(password);
      console.log(getUser.password);

      const token = await getUser.generateAuthToken();

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        hhtpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Password" });
      } else {
        res.status(200).json({ message: "User Found" });
      }
    } else {
      res.status(400).json({ error: "Invalid EmailId" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", Authenticate, (req, res) => {
  console.log("Let's make About Page");
  res.send(req.rootUser);
});

router.get("/getdata", Authenticate, (req, res) => {
  console.log("Let's make Contact Page");
  res.send(req.rootUser);
});

router.post("/contact", Authenticate, async (req, res) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;

    if (!firstname || !lastname || !email || !phone || !message) {
      console.log("Error In Contact Form");
      return res.status(400).json({ error: "Empty fields" });
    }
    const userContact = await UserDetails.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.generateMessage(
        firstname,
        lastname,
        email,
        phone,
        message
      );
      // console.log(userMessage);
      await userContact.save();
      // console.log(userContact);

      res.status(201).json({ message: "Message Send Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User Logged Out");
});

module.exports = router;
