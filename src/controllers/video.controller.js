const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {videoService} = require("../services");
const multer = require("multer");
const path = require("path");
let ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true)
  },
});
let uploadVideo = multer({storage: storage}).single("file");


let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/thumbnails/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let uploadImage = multer({storage: storageImage}).single("thumbnail");

const addVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);
  res.json(video);
});

const uploadThumbnail = catchAsync(async (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.json({success: false, err});
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

const uploadFile = catchAsync(async (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      return res.json({success: false, err});
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});


const getVideos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"])
  const result = await videoService.queryVideo(filter, options)
  res.send(result)
});

const getVideo = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);
  res.json(video);
})

module.exports = {
  uploadThumbnail,
  getVideo,
  addVideo,
  getVideos,
  uploadFile,
};
