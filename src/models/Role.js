const mongoose = require("mongoose");

// Schema 
const roleSchema = new mongoose.Schema({
    name: String, 
}, { versionKey: false });

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;