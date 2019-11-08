//@login & register
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");


router.get("/test", (req,res) => {
    res.json({msg:"login works"});
});

router.post("/register", (req, res) => {
    //console.log('********************')
    //console.log(req.body);
    User.findOne({email:req.body.email}).then((user) => {
        if(user){
            return res.status(400).json({email:"email has already used !!"});
        }else{
            var avatar = gravatar.url(req.body.email,{s:'200', r:'pg', d:'mm'});
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            });
            newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        }
    });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const pw = req.body.password;
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(404).json("user not exist!!");
        }
        if(pw === user.password){
            const rule = {id:user.id,name:user.name,avatar: user.avatar};
            jwt.sign(rule,"secret",{expiresIn:3600},(err,token) => {
                res.json({
                    success: true,
                    token:"Bearer "+token
                });
            });
        }else{
            return res.status(400).json("password not marched");
        }
    });
});


router.get("/current", passport.authenticate("jwt",{session:false}), (req, res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        avatar: req.user.avatar
    });
});

router.get("/all", passport.authenticate("jwt",{session:false}), (req, res) => {
    User.find({}).then(users => {
        console.log(users);
        res.send(users);
    });
});

module.exports = router;