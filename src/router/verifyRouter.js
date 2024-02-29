const express = require("express");
const { verifyMiddleware } = require("../controller");

app.get(
   '/', 
   verifyMiddleware.verifyToken, 
   (req, res) => {
      if (req.user.isAdmin) {
         res.json({ redirectUrl: '/admin' });
      } else {
         res.json({ redirectUrl: '/user' });
      }
   }
);