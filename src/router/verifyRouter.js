const express = require("express");
const verifyRouter = express.Router();
const { verifyMiddleware } = require("../middleware");

verifyRouter.get(
   '/', 
   verifyMiddleware.verifyToken, 
   (req, res) => {
      if (req.user.isAdmin) {
         res.json({ redirectUrl: '/admin' });
      } else {
         res.json({ redirectUrl: '/user' });
      }
   }
)

module.exports = verifyRouter;