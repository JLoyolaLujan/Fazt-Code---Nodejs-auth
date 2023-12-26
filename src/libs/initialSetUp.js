// basic roles - this states the roles, when the program is executed for the first time
// all the roles below are generated

// const { all } = require("../app"); don't know why this was automatically created (!)
const Role = require("../models/Role");

const createRoles = async () => {
    try {
        // if documents already exist
        const count = await Role.estimatedDocumentCount(); 

        if (count > 0) return; // if the user has roles, do nothing

    // to execute all promises at the same time
        const values = await Promise.all([  
            new Role({name: "user"}).save(),
            new Role({name: "moderator"}).save(),
            new Role({name: "admin"}).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.log(error);
    }
} // this has to execute when the application starts 

module.exports = createRoles;