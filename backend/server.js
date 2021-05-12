const express = require("express");
const cors = require('cors');
const bodyPaerser = require("body-parser");

const app = express();

//parse request of content-type: application/json
app.use(bodyPaerser.json());

// enable cors for all requests
app.use(cors());

// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyPaerser.urlencoded({extended:true}));

// simple route
app.get("/",(req,res)=> {
    res.json({ message : "hello World"});
});

require("./app/routes/singers.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000." );
});