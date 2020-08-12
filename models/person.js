const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number},
    favouriteFoods:{default:["jelbena"], type:Array}
})

module.exports=mongoose.model('Person',PostSchema);