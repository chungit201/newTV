const mongoose = require('mongoose');
const {paginate, toJSON} = require("./plugins");
const  categorySchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  slug:{
    type:String,
  },

},{timestamps:true});

categorySchema.plugin(toJSON)
categorySchema.plugin(paginate)

module.exports = mongoose.model('Category', categorySchema);

