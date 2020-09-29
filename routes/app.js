const express = require('express');
const { db } = require('../models/Hospital');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Ventilator = require('../models/Ventilators');

//Reading the  Hospital details
router.get('/getH',(req,res,next)=>{
    db.collection("hospitals").find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

//Reading the Ventilators  details 
router.get('/getV',(req,res,next)=>{
    db.collection("ventilators").find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

//Adding new hospitals
router.post('/addH',(req,res,next)=>{
    Hospital.create(req.body).then(function(hospital){
          res.send(hospital);
      }).catch(next);
});

//Adding new ventilators
router.post('/addV',(req,res,next)=>{
    Ventilator.create(req.body).then(function(ventilator){
            res.send(ventilator);
         }).catch(next);
});

//Updating ventilator details
router.put('/update/:id',(req,res,next)=>{
   Ventilator.updateOne({ventilatorId: req.params.id},req.body).then((ventilator)=>{
       res.send({ventilator});
    }).catch(next);
});

//Searching hospital by name
router.get('/get/:name',(req,res,next)=>{
    db.collection("hospitals").findOne({name: req.params.name}).then(function(hospital){
        res.send(hospital);
    });
});

//Searching ventilators by status and hospital name
router.get('/get/:name/:status',(req,res,next)=>{
     db.collection("ventilators").find({name: req.params.name,status: req.params.status}).toArray().then(function(ventilator){
          res.send(ventilator);
      });
});

//Deleting Ventilator by Vent ID
router.delete('/delete/:id',(req,res,next)=>{
    db.collection("ventilators").deleteOne({ventilatorId: req.params.id}).then(function(ventilator){
        res.send(ventilator);
    });
});

module.exports = router;