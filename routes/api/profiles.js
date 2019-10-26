//@login & register
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

router.get("/test", (req,res) => {
    res.json({msg:"profiles works"});
});

//创建朋友圈接口
router.post("/add", passport.authenticate("jwt",{session:false}), (req,res) => {
    const profilesFiedlds = {};
    if(req.body.img) profilesFiedlds.img = req.body.img;
    if(req.body.name) profilesFiedlds.name = req.body.name;
    if(req.body.text) profilesFiedlds.text = req.body.text;

    //多张图片
    if(req.body.imgs){
        profilesFiedlds.imgs = req.body.imgs.split("|");
    }

    //save data
    new Profile(profilesFiedlds).save().then(profile => {
        res.json(profile)
    });
});

//下拉刷新
router.get("/latest", passport.authenticate("jwt",{session:false}), (req,res) => {
    Profile.find()
    .sort({date: -1})
    .then(profiles => {
        if(!profiles){
            res.status(404).json("No more profile !");
        }else{
            let newProfiles = [];
            for(let i=0;i<3;i++){
                if(profiles[i] != null){
                    newProfiles.push(profiles[i]);
                }
            }
            res.json(newProfiles);
        }
    });
});

//上拉加载
router.get("/:page/:size", passport.authenticate("jwt",{session:false}), (req,res) => {
    Profile.find()
    .sort({date: -1})
    .then(profiles => {
        if(!profiles){
            res.status(404).json("No more profile !");
        }else{
            let size = req.params.size;
            let page = req.params.page;
            let index = size * (page-1);
            let newProfiles = [];

            for(let i=index; i<size*page; i++){
                if(profiles[i] != null){
                    newProfiles.unshift(profiles[i]);
                }
            }
            res.json(newProfiles);
        }
    })
});

module.exports = router;