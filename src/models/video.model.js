const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const videoSchema = new mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxLength: 100,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Schema.Types.ObjectId,
      ref:"Display"
    },
    filePath: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref:"Category"
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);
videoSchema.plugin(toJSON);
videoSchema.plugin(paginate);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;