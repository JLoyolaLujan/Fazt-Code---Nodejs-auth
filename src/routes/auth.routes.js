// auth router

// import express
const express = require("express"); 
const router = express.Router();

// import jwt
const jwt = require("jsonwebtoken");

// import config
const config = require("../config");

// import User model
const User = require("../models/User");
const Role = require("../models/Role");

// import middleware
const {rolesChecker, emailUsernameChecker} = require("../middlewares/verifySignup");

// get

/*
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, sorry!" });
    }
});
*/

// to sign up (new user)
router.post("/signup", [emailUsernameChecker, rolesChecker], async (req, res) => {
    const { username, email, password, roles } = req.body;

    // later on add a function to check if the user already exists (done!)

    const newUser = new User({
        username, 
        email, 
        password: await User.encryptPassword(password)
    }); 

    // before creating new user, let's check if roles are being sent

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOneAndUpdate({name: "user"});
        newUser.roles = [role._id]; // default user id will be set if no roles set
    }

    // we GOTTA save || also we store the newUser to generate a token
    // id of registry - a key that the user will use to access the site

    const savedUser = await newUser.save();
    console.log(newUser);

    // ({whats inside the token}, "secret", {expires in})
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 hs
    })

    res.status(200).json({token});
});

// to sign in (returning user)
router.post("/signin", async (req, res) => {
    // email and passwrd - check if it exists
    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    // I use populate("roles") so the entire object is returned, instead of just the _id

    // if user not found
    if (!userFound) {
        return res.status(400).json({ message: "User not found" });
    }

    // if found, compare password (using the password checker)
    // compare the password in the body and the password the user sent while signing in
    const matchPass = await User.comparePassword(req.body.password, userFound.password);

    if(!matchPass) return res.status(401).json({ token: null, message: "Invalid Password" });

    // if there's a match, the code continues, let's generate a token for the user
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400 //24hs
    });

    res.json({token});
});

// export router
module.exports = router;