const { authService } = require("../service");
const utils = require("../misc/utils");

const authController = {
   async postSignUp(req, res, next) {
      try {
         const { email, password, isAdmin } = req.body;
         const newUser = await authService.signUp({
            email,
            plainPassword: password,
            isAdmin,
         });
      } catch (e) {
         next(error);
      }
   },
   
   async postSignIn(req, res, next) {
      try {
         const { email, password } = req.body;
         const token = await authService.signIn({
            email,
            plainPassword: password,
         });
         res.status(201).json(utils,utils.buildResponse(token));
      } catch (e) {
         next(error);
      }
   },
};

module.exports = authController;
