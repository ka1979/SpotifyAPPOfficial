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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext } from "react";
import { AppStateContext } from "../AppState";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [title, setTitle] = useState("");

  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }

  useEffect(() => {
    fetchPosts();
    fetchTitle();
  }, []);

  const fetchTitle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/posts/title/${id}`
      );
      setTitle(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

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
      const response = await axios.post(
        "http://localhost:3000/forums/creator",
        {
          email: email,
        }
      );
      const creator = response.data.result;
      await axios.post("http://localhost:3000/posts", {
        forumId: id,
        title: newPostTitle,
        creator: creator,
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
        <h1 className="white-text">{title}</h1>
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
              To create a new post, please enter the post content here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Post Content"
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
        <div className="cards-container" style={{ marginTop: "10px" }}>
          {posts.map((post) => (
            <div key={post.id} className="top-card" style={{ width: "400px" }}>
              <h3 className="white-text">{post.creator}</h3>
              <div className="shadow-container">
                <p>{post.title}</p>
              </div>
              <div
                className="shadow-container"
                style={{ margin: "10px 0 10px 0" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 15px 0 15px",
                    justifyContent: "center",
                  }}
                >
                  <ThumbUpIcon />
                  <h4 className="white-text" style={{ marginLeft: "10px" }}>
                    {post.likes}
                  </h4>
                </div>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "black" }}
                onClick={() => handleLike(post.id)}
              >
                LIKE
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
