const mongoose = require('mongoose');
const {paginate, toJSON} = require("./plugins");
const  categorySchema = new mongoose.Schema({
  name:{
    type:String,
    maxlength:100,
    require:true
  },
  img:{
    type:String
  },
  slug:{
    type:String,
  },

},{timestamps:true});

categorySchema.plugin(toJSON)
categorySchema.plugin(paginate)

module.exports = mongoose.model('Category', categorySchema);

