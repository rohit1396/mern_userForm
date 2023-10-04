const jwt = require("jsonwebtoken");
const UserDetails = require("../models/userlist");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await UserDetails.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser.id;

    next();
  } catch (err) {
    res.status(401).send("Unathorized User");
    console.log(err);
  }
};

module.exports = Authenticate;
