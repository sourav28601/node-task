const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User} = require("../models");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(401).json({ message: "Inavalid credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Inavalid password" });
      }
      const token = jwt.sign({ id: user.id }, "task@123", { expiresIn: "24h" });
      await User.update({token:token},{where:{id:user.id}})
      await user.save();
      res.json({ message: "Login successfully",user});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
