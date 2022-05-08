const express = require('express');
const  auth = require('../../middlewares/auth')
const {displayController} = require("../../controllers");
const router = express();

router
  .get('/',displayController.getDisplays)
  .get('/:displayId',displayController.getDisplay)
  .post('/add',auth('MANAGE_ALL_DISPLAY'),displayController.addDisplay)
  .post('/edit/:displayId',auth('MANAGE_ALL_DISPLAY'),displayController.updateDisplay)
  .post('/delete/:displayId',auth('MANAGE_ALL_DISPLAY'),displayController.removeDisplay)
module.exports = router;