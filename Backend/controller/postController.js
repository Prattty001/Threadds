import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let {img}=req.body
    if (!postedBy || !text) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString()!=req.user._id.toString()) {
      return res.status(400).json({ error: "Unauthorized access" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({ error: `Text length should be less than ${maxLength} characters` });
    }

    const post = new Post({ postedBy, text, img });
    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getPost= async(req,res)=>{
  try {
    const post=await Post.findById(req.params.id)
    if(!post) return res.status(404).json({message:"Post not found"})
      res.status(200).json(post)
  } catch (error) {
    res.status(500).json({message:error})
  }
}
const deletePost=async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
      if(post.postedBy.toString()!=req.user._id.toString()) return res.status(400).json({message:"Unauthorized access"})
        await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({message:error})
  }
}
const likeUnlikePost=async(req,res)=>{
  try {
		const { id: postId } = req.params;
		const userId = req.user._id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.likes.includes(userId);

		if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			post.likes.push(userId);
			await post.save();
			res.status(200).json({ message: "Post liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
const replyToPost = async (req, res) => {
	try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const reply = { userId, text, userProfilePic, username };

		post.replies.push(reply);
		await post.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
 export { createPost,getPost,deletePost,likeUnlikePost,replyToPost,getFeedPosts };
