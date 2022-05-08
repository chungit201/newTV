const httpStatus = require("http-status");
const {Video } = require("../models");
const ApiError = require("../utils/ApiError");

const createVideo = async (videoBody) => {
  const createVideo = await Video.create(videoBody);
  let video = await Video.findOne(createVideo).populate({
    path: "writer",
    model: "User",

  });
  video = {
    ...video._doc,
    createdAt: new Date(video.createdAt).getTime(),
  };

  return video;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVideo = async (filter, options) => {
  Object.assign(options, {populate: "writer privacy category"});
  return Video.paginate(filter, options)
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getVideoById = async (videoId) => {
  return Video.findOne({_id:videoId});
};


const deleteVideoById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

module.exports = {
  createVideo,
  queryVideo,
  getVideoById,
  deleteVideoById,
};
