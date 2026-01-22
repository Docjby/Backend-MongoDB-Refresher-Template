import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const post = await Post.create({
      name,
      description,
      age,
    });

    return res.status(200).json({ message: "Post Created Successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body) === 0) {
      res.status(400).json({ message: "No fields to update or empty fields" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(400).json({ message: "Post nut found" });
    }

    res.status(200).json({ message: "Post Updated Successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Update Fialed" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if(!deleted){
        return res.status(404).json({message:"Post Not Found"});
    }

    res.status(200).json({message:"Post Deleted Successfully"});

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Update Fialed", error });
  }
};

export { createPost, getPost, updatePost , deletePost};
