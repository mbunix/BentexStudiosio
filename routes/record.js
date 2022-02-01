const express = require("express");
const recordRoutes = express.Router();
//connect with dbc
const dbc =require ("../server/db/connection");

//converting object id's to string 
const ObjectId = require("mongodb").ObjectId;
//get record users
recordRoutes.route("/record/Users").get(function(req,res){
    let db_connect = dbc.getDb("users");
    db_connect
    .collection("UserData")
    .find({})
    .toArray(function(err,result){
        if (err) throw err;
        res.json(result);
    });
});
//users public
recordRoutes.route("/record/Users/public").get(function(req,res){
    let db_connect = dbc.getDb("users/public");
    db_connect
    .collection("UserData")
    .find({})
    .toArray(function(err,result){
        if (err) throw err;
        res.json(result);
    });
});

//creating new database records
recordRoutes.route("/record/Users").post(function(req,response){
    let db_connect = dbc.getDb();
    let myobj ={
        person_Username: req.body.person,
        person_account_type:req.body.person_account_type,
        person_post:req.body.person_post,
        person_like: req.body.person_like,
        person_follow : req.body.person_follow,
        person_verification: req.body.person_verification
    };
    db_connect.collection("UserData").insertOne(myobj,function(err,res){
        if (err) throw err;
        response.json(res);
    });
})
//single user object fetch 

recordRoutes.route("/record/:id:private").get(function(req,res){
    let db_connect = dbc.getDb();
    let myquery = {_id:ObjectId(req.params.id)};
    db_connect
    .collection("UserData")
    .findOne(myquery,function(err,result){
        if (err) throw err;
        res.json(result)
    });
});
// all posts in public route 

recordRoutes.route("/record/Users/public/posts").get(function(req,res){
    let db_connect = dbc.getDb("users/public/posts");
    db_connect
    .collection("UserData")
    .findOne(myquery,function(err,result){
        if (err) throw err;
        res.json(result)
    });
});

//single user post in private route
recordRoutes.route("/record/:id:private:posts").get(function(req,res){
    let db_connect = dbc.getDb();
    let myquery = {_id:ObjectId(req.params.id)};
    db_connect
    .collection("UserData")
    .findOne(myquery,function(err,result){
        if (err) throw err;
        res.json(result)
    });
});
//follow others
recordRoutes.route("/update/id:Users:followers").post(function(req,response){
    let db_connect = dbc.getDb();
    let myquery = {_id:ObjectId(req.params.id)};
    let newValues ={
        $set:{
            person_follow: req.body.person_follow
        },
    };
    db_connect
    .collection("UserData")
    .updateOne(myquery,newValues,function(err,res){
        if (err) throw err;
        console.log("new follower");
    });
});

//unfollow other people
recordRoutes.route("/record/id:Users:followers").delete((req,response)=>{
    let db_connect = dbc.getDb();
    let myquery = {_id:ObjectId(req.params.id)};
    db_connect.collection("UserData").deleteOne(myquery,function(err,obj){
        if (err) throw err;
        console.log("one has unfollowed you");
        response.status(obj);
    });
});


//like a post update
recordRoutes.route("/update/:id:posts").post(function(req,response){
    let db_connect = dbc.getDb();
    let myquery = {_id:ObjectId(req.params.id)};
    let newValues ={
        $set:{
            person_like: req.body.person_like
        },
    };
    db_connect
    .collection("UserData")
    .updateOne(myquery,newValues,function(err,res){
        if (err) throw err;
        console.log("liked your post");
    });
});

//unlike a post
recordRoutes.route("/record/:id:posts").delete((req,response)=>{
    let db_connect = dbc.getDb();
    let myquery = {_id:ObjectId(req.params.id)};
    db_connect.collection("UserData").deleteOne(myquery,function(err,obj){
        if (err) throw err;
        console.log("unliked the post");
        response.status(obj);
    });
});

module.exports = recordRoutes