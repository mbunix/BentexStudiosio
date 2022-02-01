var express = require('express');
const res = require('express/lib/response');
var app = express();

//isten to port

app.listen(3000, ()=>{
    console.log('server running at port 3000');
})

//engine

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//routing

app.get("/",(req,res)=>{
    res.render('index');
});