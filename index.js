const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect(
    'mongodb://127.0.0.1:27017/hospital_inventory',
    { useUnifiedTopology: true , useNewUrlParser: true }
    );
mongoose.Promise = global.Promise;



app.use(bodyParser.json());


app.use('/api',require('./routes/app'));

app.use(function(err,req,res,next){

    res.status(422).send({error:err.message});
});

app.get('/',(req,res) =>{
    res.send('hello world');
}) 

app.listen(4000);
 
