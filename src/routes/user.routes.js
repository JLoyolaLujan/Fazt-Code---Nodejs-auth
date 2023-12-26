// users router

// import express
const express = require("express"); 
const router = express.Router();

// import middleware
const {verifyToken, isModerator, isAdmin} = require("../middlewares/auth.jws");
const {rolesChecker, emailUsernameChecker} = require("../middlewares/verifySignup");

/*
get user
post (create) user - needs token - admin
*/

router.post("/", [verifyToken, isAdmin, rolesChecker],(req, res) => {
    res.json("creating user");
});


// export router
module.exports = router;