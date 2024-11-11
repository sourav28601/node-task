const jwt = require("jsonwebtoken");
const { User } = require("../models");
module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    token = token.split("")[1];
    await jwt.verify(token, "task@123", async function (err, decoded) {
      if(err){
        return res.status(401).json({ error: "Unauthorized access" });
      }else{
        req.user = await User.findOne({
          where: { token: token },
          attributes: ["id", "email", "password", "token"],
        });
      }
      next();
    });
  } catch (error) {
    console.log("error in middleware", error);
  }
};
