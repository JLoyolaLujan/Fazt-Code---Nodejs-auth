// import express
const express = require("express"); 
const app = express(); 

const createRoles = require("./libs/initialSetUp");
createRoles();

app.use(express.json()); 

// import morgan
const morgan = require("morgan"); // middleware 

// import package.json 
const pkg = require("../package"); // stores an object

app.use(morgan("dev")); // dev mode - keep track of requests / responses

app.get("/", (req, res) => {
    res.send({
        name: pkg.name,
        author: pkg.name,
        description: pkg.description,
        version: pkg.version
    });
}); 

// import products router
const productsRouter = require("./routes/products.routes");
app.use("/api/products", productsRouter);

// import auth router
const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

// import users router

const usersRouter = require("./routes/user.routes"); 
app.use("/api/users", usersRouter);

module.exports = app; 