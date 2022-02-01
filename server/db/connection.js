const Db = process.env.MONGO_uri;
const {MongoClient}= require("mongodb");
const uri = "mongodb+srv://bellian:87B65E4321@cluster0.tze71.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(Db, { useNewUrlParser: true, useUnifiedTopology: true });

var _db;

module.exports ={
    connectToServer:function(callback){
        client.connect(function(err,db){
            if (db){
                _db =db.db("myFirstDatabase");
                console.log("successfull connection to MongoDb");
            }
            return callback(err);
        });
    },
    getDb: function(){
        return _db;
    },
};