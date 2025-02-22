const mongoose = require('mongoose');
const restaurant = require('./restaurant');


const foodSchema = new mongoose.Schema({

    title : {type : String, required : true},
    time  : {type : String, required : true},
    foodTags : {type : Array, default : []},
    foodType  : {type : Array, default : []},
    code :{type: Number, required : true},
    isAvailable : {type : Boolean, default : true},
    category : {type : String, required : true},
    imageUrl : {type : Array, required : true},
    restaurant : {type : mongoose.Schema.Types.ObjectId,  require : true},
    rating : {type : Number, min : 1, max :5, default:3},
    ratingCount : {type : String, default:"267"},
    description : {type : String, required : true},
    additives : {type : Array, default : []},
    price : {type : Number, required : true},




})



module.exports = mongoose.model("Food", foodSchema);

