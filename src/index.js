const app = require("./app");

const PORT_3000 = process.env.PORT || 3000; 

// listen
app.listen(PORT_3000, () => {
    console.log(`Server listening at http://localhost:${PORT_3000}`);
}); 

// import mongoose
const mongoose = require("mongoose");

// connect mongoose
mongoose.connect("mongodb://127.0.0.1:27017/companydb")
    .then(() => {
        console.log("succesful db connection")
    }).catch((err) => {
        console.log(`error: ${err}`);
    });