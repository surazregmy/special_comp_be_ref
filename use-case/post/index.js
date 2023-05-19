const createPostFun = require("./insert-post");
const updatePostFun = require("./update-post");
const deletePostFun = require("./delete-post");

const postRepository = require("../../data-access/post");

const createPostSer = createPostFun({ postRepository });
const updatePostSer = updatePostFun({ postRepository });
const deletePostSer = deletePostFun({ postRepository });

const services = Object.freeze({
  createPostSer,
  updatePostSer,
  deletePostSer,
});

module.exports = services;
module.exports = {
  createPostSer,
  updatePostSer,
  deletePostSer,
};
