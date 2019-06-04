var mongoose=require('mongoose');
const express=require('express')
const app=express()
const port=3000;

var bodyParser=require('body-parser')
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost/hands_on',{useNewUrlParser:true})
var db=mongoose.connection
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("Connection established");
})
var kittySchema=new mongoose.Schema({
    name :String,
    uid:Number,
    age:Number,
    family:String,
    friends:[{name:String, uid:Number}]
})
var kitten=mongoose.model('Kitten',kittySchema);
app.post('/insertKitty',function(req,res){
    var fluffy=new kitten({name:req.body.name,age:req.body.age,family:req.body.family,
        friends:[{
        name:req.body.senderName,uid:req.body.senderUid
        }]
    })
    fluffy.save(function(){
        if(err){
            console.error(err)
            return res.send('Error in Inserting kitten')
        }
        return res.send('Kitten added succesfully')
    })
})
app.listen(port,() => console.log('Example app listening on port ${port}!'))