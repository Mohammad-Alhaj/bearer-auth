"use strict";
const express = require("express");
const UserRouter = express.Router();
const basic = require("./middleware/basic");
 const signup = require('./middleware/signup')
const bearer = require("./middleware/bearer");

UserRouter.post("/signin", basic, async (req, res) => {
  // res.status(200).json(req.user);
});

UserRouter.post("/signup",signup, async (req, res) => {
});
UserRouter.get("/User",bearer, (req, res) => {

});

module.exports = UserRouter;
