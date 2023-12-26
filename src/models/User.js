const mongoose = require("mongoose");
//const role = require("./Role");

// import bcrypt
const bcrypt = require("bcryptjs");

// Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,

    }, 
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }, 
    roles: [{
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
   timestamps: true, 
   versionKey: false 
}); 

// to encrypt and then check if password is correct
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) // how many times the algorythm applies

    // we'll create a hash, an encrypted password
    const crypt = await bcrypt.hash(password, salt);
    return crypt;
};

userSchema.statics.comparePassword = async (password, recievedPassword) => {
    return await bcrypt.compare(password, recievedPassword); // compares and returns true or false
};

const User = mongoose.model("User", userSchema);

module.exports = User; 