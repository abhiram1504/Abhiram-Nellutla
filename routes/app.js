const express = require('express');
const { db } = require('../models/Hospital');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Ventilator = require('../models/Ventilator');

//Reading the  Hospital details
router.get('/getH',(req,res,next)=>{
    db.collection("Hospital").find({}).toArray( function(err, outcome) {
        if (err) throw err;
        res.send(outcome);
        console.log(outcome);
    });
});

//Reading the Ventilator  details 
router.get('/getV',(req,res,next)=>{
    db.collection("Ventilator").find({}).toArray( function(err, outcome) {
        if (err) throw err;
        res.send(outcome);
        console.log(outcome);
    });
});

//Adding new Hospital
router.post('/addH',(req,res,next)=>{
    Hospital.create(req.body).then(function(hospital){
          res.send(hospital);
      }).catch(next);
});

//Adding new Ventilator
router.post('/addV',(req,res,next)=>{
    Ventilator.create(req.body).then(function(ventilator){
            res.send(ventilator);
         }).catch(next);
});

//Updating ventilator details
router.put('/update/:id',(req,res,next)=>{
   Ventilator.updateOne({vId: req.params.id},req.body).then((ventilator)=>{
       console.log(req.params.id)
       res.send({ventilator});
    }).catch(next);
});

//Searching hospital by name
router.get('/get/:name',(req,res,next)=>{
    db.collection("Hospital").findOne({name: req.params.name}).then(function(hospital){
        res.send(hospital);
    });
});

//Searching Ventilator by status and hospital name
router.get('/get/:name/:status',(req,res,next)=>{
     db.collection("Ventilator").find({name: req.params.name,status: req.params.status}).toArray().then(function(ventilator){
          res.send(ventilator);
      });
});

//Deleting Ventilator by Vent ID
router.delete('/delete/:id',(req,res,next)=>{
    db.collection("Ventilator").deleteOne({vId: req.params.id}).then(function(ventilator){
        res.send(ventilator);
    });
});

module.exports = router;