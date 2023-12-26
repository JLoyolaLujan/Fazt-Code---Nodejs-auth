// to confirm if the user is sending token - also verify rol

// ---------- authorization----------- //

// this is an express middleware 

// import jwt
const jwt = require("jsonwebtoken");
// import config (so I work with the SECRET)
const config = require("../config");
// import user
const User = require("../models/User");
// import Role
const Role = require("../models/Role");

const verifyToken = async (req, res, next) => {
    try {
        // get token from the header of the request
        const token = req.headers["x-access-token"]; // the token we sent to the user

        // console.log(token);

        // if access token is not in the header 
        if (!token) {
            return res.status(403).send({ message: "No token provided" });
        }

        // else, a token was provided
        // I use veriry() instead of sign()
        // I need the token and the secret
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id; // this will be useful for the following functions

        // check if user exists by id (through the token) 
        // the decoded object returns an id (we'll use it)
        // the password in unrequired for this 
        const user = await User.findById(req.userId, { password: 0 });   
    
        if(!user) res.status(404).send({ message: "User not found" });

        console.log(user);

        // only with the token provided to the user, the user
        // can do any post, put or delete requests

        // these requests require the token provided by the user

        // console.log(decoded);

        next(); // so it continues with the route
    } catch (error) {
        return res.status(400).send({ message: "Unauthorized" });
    }
}

const isModerator = async (req, res, next) => {
    // we get user id
    const user = await User.findById(req.userId);
    // get role by id - get role by which id is included in user.roles
    const roles = await Role.find({_id: {$in: user.roles}});

    console.log(roles);

    
    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "moderator") {
            next(); 
            return;
        }
         
    }
    return res.status(403).send("moderator role is necesary for this action");
    
    //next();
}

const isAdmin = async (req, res, next) => {
    // the same as in moderator 
    // we get user id
    const user = await User.findById(req.userId); 
    // get role by id - get id from user.roles
    const roles = await Role.find({_id: {$in: user.roles}}); 

    console.log(roles); 

    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin") {
            next(); 
            return; 
        }
    }

    return res.status(403).send("admin role in necesary for this action");
}

module.exports = {verifyToken, isModerator, isAdmin}; 