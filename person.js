const express=require('express');
const router =express.Router();
const Person=require('./models/person');


// router.get('/',(req,res)=>{
//     res.send('we are on posts');
// });
router.post('/person',(req,res)=>{
    const person1=new Person({
        name: "Yassine",
        age: 24,
        favouriteFoods:"Loubia"
})

person1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });
})
  
module.exports=router;