const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {displayService} = require("../services");

const addDisplay = catchAsync(async (req,res)=>{
  const result = await displayService.createDisplay(req.body);
  res.json(result);
});

const getDisplays = catchAsync(async (req,res)=>{
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await displayService.queryDisplay(filter, options);
  res.json(result);
})

const getDisplay = catchAsync(async (req,res)=>{
  const display = await displayService.displayById(req.params.displayId);
  res.json(display);
})

const updateDisplay = catchAsync(async (req,res)=>{
  const display = await displayService.editDisplay(req.params.displayId,req.body);
  res.json({
    message: 'Update display successFully',
    display: display
  })
});

const removeDisplay = catchAsync(async (req,res)=>{
  const display = await displayService.deleteDisplay(req.params.displayId);
  res.json({
    message: 'Delete display successFully',
    displayDelete: display
  })
})

module.exports = {
  addDisplay,
  getDisplays,
  getDisplay,
  updateDisplay,
  removeDisplay,
}