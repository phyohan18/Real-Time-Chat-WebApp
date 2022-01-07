//modules
const express = require('express');
const app = express();

//routing
const home = require("./src/routes")


//app setting
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.static(`${__dirname}/src/views/css`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middleware
app.use("/", home);


module.exports = app;