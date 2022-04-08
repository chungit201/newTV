const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {categoriesService} = require("../services");

const addCategory = catchAsync(async (req,res)=>{
  const result = await categoriesService.createCategory(req.body);
  res.json(result);
});

const getCategories = catchAsync(async (req,res)=>{
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoriesService.queryCategory(filter, options);
  res.json(result);
})

const getCategory = catchAsync(async (req,res)=>{
  const category = await categoriesService.categoryById(req.params.categoryId);
  res.json(category);
})

const updateCategory = catchAsync(async (req,res)=>{
  const category = await categoriesService.editCategory(req.params.categoryId,req.body);
  res.json({
    message: 'Update category successFully',
    category: category
  })
});

const removeCategory = catchAsync(async (req,res)=>{
  const category = await categoriesService.deleteCategory(req.params.categoryId);
  res.json({
    message: 'Delete category successFully',
    categoryDelete: category
  })
})

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  removeCategory,
}