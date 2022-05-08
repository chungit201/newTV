const mongoose = require('mongoose');
const {paginate, toJSON} = require("./plugins");
const  displaySchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  slug:{
    type:String,
  },



},{timestamps:true});

displaySchema.plugin(toJSON)
displaySchema.plugin(paginate)

module.exports = mongoose.model('Display', displaySchema);

