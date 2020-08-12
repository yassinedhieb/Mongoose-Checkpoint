const mongoose =require('mongoose');
const express = require('express');
const app = express();

require('dotenv/config');
mongoose.connect("mongodb://localhost:27017/projet1",{ useNewUrlParser: true, useUnifiedTopology: true }
,(er)=>{
    if (er){console.log(er)}
    else{console.log("db connected")}});
const Person=require('./models/person.js');

var arrayOfPeople = [{name:"james", age:"5", favouriteFoods:["carrot"]},{name:"bess", age:"55",favouriteFoods:["blueberries"]}]
var createManyPeople = function(arrayOfPeople, err) {
    if (err){
        console.log(err)
    }else {
        Person.create(arrayOfPeople)
    }
    
};
app.post('/add',(req,res)=>{
Person.create(arrayOfPeople)
.then(data=>res.send(data))
.catch(er=>console.log(er))})
app.get('/find',(req,res)=>{
    Person.find({ name: 'james' })
    .then(result=>res.send(result))
    .catch(er=>console.log(er))
})
app.get('/findOne',(req,res)=>{
    Person.findOne({ favoriteFoods: ["carrot"] })
    .then(result=>res.send(result))
    .catch(er=>console.log(er))
})
app.get('/findId/:id',(req,res)=>{
    let id=req.params.id
    Person.findOne({_id: id})
    .then(result=>res.send(result))
    .catch(er=>console.log(er))
})
app.get('/findAndUpdate/:id',(req,res)=>{
    let id=req.params.id
    Person.findById({_id: id},function(err,data){
            if(err){ 
                done(err)}
            else{
                console.log(data)
                data.favouriteFoods.push("hamburger")
                data.save()
                res.send(data)
        //    done(null,data);
            }
        })
       
          
    // .then(result=>res.send(result))
    // .catch(er=>console.log(er))
})
app.put('/findAndUpdate2/:name',(req,res)=>{
    let name=req.params.name
    Person.findOneAndUpdate({name:name},{age:20},{ new: true }).then(result=>        
        res.send(result)
        ).catch(er=>console.log(er))
})
app.delete('/findAndRemove/:name',(req,res)=>{
    let name=req.params.name
    Person.findOneAndDelete({name:name}).then(result=>        
        res.send(result)
        ).catch(er=>console.log(er))
})
app.delete('/modelRemove',(req,res)=>{
    let name=req.params.name
    Person.remove().then(result=>        
        res.send(result)
        ).catch(er=>console.log(er))
})
  app.get('/ChainSearch',(req,res)=>{
    Person.find({favouriteFoods : ["burrito"]}).sort({name: 1}).limit(2).select({age: 0}).then(result=>res.send(result)).catch(er=>console.log(er))
  });
app.listen(3000,er=>{if(er)console.log(er) 
    else console.log('server is connected on port 3000')}) ;
