const mongoose = require("mongoose");

// const email = process.env.EMAIL;
// const password = process.env.PASSWORD;
// const DB = `mongodb+srv://${email}:${password}@cluster0.kh1pj3x.mongodb.net/mernStack?retryWrites=true&w=majority`;

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });
