// check if a new email is being sent
// check if email already exists
// check if user already exists
// check if the role sent was already created

// --------- validator ---------- // 

// import user

const User = require("../models/User");

// check if rolles sent exist

// ROLES
const ROLES = ["user", "admin", "moderator"];

const rolesChecker = (req, res, next) => {
    // if the body of the request has roles
    if (req.body.roles) {
        // iterate 
        for(let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({ message: `Role ${req.body.roles[i]} does not exist` })
            }
        }
    }
    next();
}

// check for repeated username or email

const emailUsernameChecker = async (req, res, next) => {
    // find user by username 
    const user = await User.findOne({username: req.body.username})
    // if found
    if (user) return res.status(400).json({ message: "user already exists" });
    // find email
    const email = await User.findOne({email: req.body.email});
    // if found
    if (email) return res.status(400).json({ message: "email already exists" });

    next();

}

module.exports = {rolesChecker, emailUsernameChecker};