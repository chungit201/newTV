const {Category} = require ('../models');
const httpStatus = require("http-status");
const ApiError = require('../utils/ApiError');
const  createCategory = async (categoryBody)=>{
  return Category.create(categoryBody)
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

const queryCategory = async (filter, options) =>{
  const category = await Category.paginate(filter,options)
  return category;
}

const categoryById = async (categoryId) =>{
  const category = await Category.findOne({_id:categoryId});
  return category
}

const editCategory = async (categoryId,updateBody)=>{
  const category = await Category.findOne({_id:categoryId});
  if(!categoryId){
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category,updateBody);
  category.save();
  return category;
}

const deleteCategory = async (categoryId) => {
  let category = await Category.findOne({_id: categoryId});
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  ;
  await category.deleteOne();
  return category;
}

module.exports = {
  createCategory,
  queryCategory,
  categoryById,
  editCategory,
  deleteCategory,
}