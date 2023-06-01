import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NavigationBar from "./Navbar";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:3000/posts", {
        forumId: id,
        title: newPostTitle,
        creator: "Your name here",
      });
      setNewPostTitle("");
      handleClose();
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:3000/posts/${id}/like`, {
        forumId: id,
        postId,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <>
      <NavigationBar page="forums" />
      <div className="view-container">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Post
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a new post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new post, please enter the post title here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Post Title"
              type="text"
              fullWidth
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreatePost} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Likes: {post.likes}</p>
            <button onClick={() => handleLike(post.id)}>Like</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
