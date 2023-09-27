const PostModal = require("../models/PostModal");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all the detail",
      });
    }

    const post = await new PostModal({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(200).send({
      success: true,
      message: "Posted has been created",
      post,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Post API",
      error,
    });
  }
};

const getPostController = async (req, res) => {
  try {
    const posts = await PostModal.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All post Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in get-post API",
    });
  }
};

const userPostController = async (req, res) => {
  try {
    const userPost = await PostModal.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "User Post Data",
      userPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User Post API",
    });
  }
};

const deletePostController = async () => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post has been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};
module.exports = {
  createPostController,
  getPostController,
  userPostController,
  deletePostController,
};
