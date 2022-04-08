const express = require('express');
const { videoController } = require('../../controllers');

const router = express.Router();

router.get('/', videoController.getVideos);
router.get('/:videoId', videoController.getVideo);
router.post('/uploadfiles', videoController.uploadFile);
router.post('/add', videoController.addVideo);
router.post('/thumbnail', videoController.uploadThumbnail)

module.exports = router;