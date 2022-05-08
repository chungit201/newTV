const {Display} = require ('../models');
const httpStatus = require("http-status");
const ApiError = require('../utils/ApiError');

const  createDisplay = async (categoryBody)=>{
  return Display.create(categoryBody)
};

/**
 * Query projects
 * @param {Object} filter
 * @param {Object} options
 * @param {string} options.sortBy
 * @param {number} options.limit
 * @param {number} options.page
 * @returns {Promise<QueryResult>}
 */

const queryDisplay = async (filter, options) =>{
  const display = await Display.paginate(filter,options)
  return display;
}

const displayById = async (displayId) =>{
  const display = await Display.findOne({_id:displayId});
  return display
}

const editDisplay = async (displayId,updateBody)=>{
  const display = await Display.findOne({_id:displayId});
  if(!display){
    throw new ApiError(httpStatus.NOT_FOUND, 'display not found');
  }
  Object.assign(display,updateBody);
  display.save();
  return display;
}

const deleteDisplay= async (displayId) => {
  let display = await Display.findOne({_id: displayId});
  if (!display) {
    throw new ApiError(httpStatus.NOT_FOUND, 'display not found');
  }
  ;
  await display.deleteOne();
  return display;
}

module.exports = {
  createDisplay,
  displayById,
  queryDisplay,
  createDisplay,
  editDisplay,
  deleteDisplay,
}