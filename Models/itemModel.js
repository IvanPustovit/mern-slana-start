const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  article: { type: String, required: true },
  category: {type: String, required: true},
  img:{type:String, required:true},
  info:{type:String, },
  name:{type:String, required:true},
  price:{type:Number, required:true},
  size:{type:String, required:true},
  sizeImg:{type: String, required:true},
  species:{type:String, required:true},
  styleImg: {type:String, required:true}
  
});

module.exports = mongoose.model('itemShop', ItemSchema)
