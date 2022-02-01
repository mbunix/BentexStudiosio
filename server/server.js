const express =require("express");
const app =express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({path:"./config.env"});
//connect drivers
const dbc =require("../server/db/connection");


const port =process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use (require("../routes/record"));


//define routes
app.get('/',(req,res)=>{
res.json({"Message":`Hi this is the list of users ${users}`})
});




app.listen(port,()=>{
    //connect to db on start
    dbc.connectToServer(function(err){
        if(err)console.error(err);
    });
    console.log(`server is on port :${port}`);
})