const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  cors({
    origin: ["https:localhost:8000", "https://mern-user-form-c52w.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

dotenv.config({ path: "./config.env" });
require("./db/connect");

app.use(require("./router/auth"));

const port = process.env.PORT || 8000;

// app.get("/about", middleware, (req, res) => {
//   res.send("Let's make About Page");
// });

// app.get("/contact", (req, res) => {
//   res.cookie("userLogin", "user");
//   res.send("Let's make Contact Page");
// });

// app.get("/home", (req, res) => {
//   res.send("Let's make Home Page");
// });

app.listen(port, () => {
  console.log(`App Runnig on Port ${port}`);
});
