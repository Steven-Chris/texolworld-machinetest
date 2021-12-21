const User = require("../../models/userModel");
const { handleError } = require("../lib/errorHandling");
const constantConfig = require("../../config/constantConfig");

// const auth = require("../middleware/auth");

module.exports.signUp = async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    const { name, _id } = user;
    const ac_token = await user.generateACToken();
    const ref_token = await user.generateREFToken();
    res.status(201).json({ name, _id, ac_token, ref_token });
  } catch (err) {
    handleError("error", err, "");
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const { name, _id } = user;
    const ac_token = await user.generateACToken();
    const ref_token = await user.generateREFToken();
    res.status(201).json({ name, _id, ac_token, ref_token });
  } catch (err) {
    handleError("error", err, "");
    return res.status(constantConfig.ERROR_CODE).json({
      status: constantConfig.ERROR,
      message: constantConfig.INVALID_CRED,
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.me = async (req, res) => {
  res.send(req.user);
};
