const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const passport = require("passport");

const port = process.env.PORT || 5000;

const app = express();
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());


//存在安全性问题，无限制访问后台
//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'content-type'); 
//    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE'); 

//    next();
//});




//DB config
const db = require("./config/key").mongoURI;
//Connect to mongodb
mongoose.connect(db, { useUnifiedTopology: true } ).then(() => console.log("DB connected")).catch(err => console.log('111111111'+err));

require("./config/passport")(passport);


app.get("/", (req,res) => {
    res.send("Helle World!1");
});

app.use("/api/users",users);
app.use("/api/profiles",profiles);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});