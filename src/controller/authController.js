const { authService } = require("../service");
const utils = require("../misc/utils");

const authController = {
  async postSignUp(req, res, next) {
    try {
      const {
        email,
        password,
        user_name,
        phone_number,
        address,
        address_detail,
        isAdmin,
      } = req.body;
      const newUser = await authService.signUp({
        email,
        plainPassword: password,
        user_name,
        phone_number,
        address,
        address_detail,
        isAdmin,
      });

      res.status(201).json(utils.buildResponse(newUser));
    } catch (e) {
      next(e);
    }
  },

  async postSignIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await authService.signIn({
        email,
        plainPassword: password,
      });
      res.status(201).json(utils.buildResponse(token));
    } catch (e) {
      next(e);
    }
  },
};

module.exports = authController;
