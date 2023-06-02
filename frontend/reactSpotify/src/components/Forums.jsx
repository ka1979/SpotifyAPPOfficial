import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import NavigationBar from "./Navbar";
import { user } from "./LandingPage";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppStateContext } from "../AppState";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";

import Helmet from "react-helmet";

const Forums = () => {
  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }
  const [forums, setForums] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newForumTitle, setNewForumTitle] = useState("");

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await axios.get("http://localhost:3000/forums/get");
      setForums(response.data);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForumTitleChange = (e) => {
    setNewForumTitle(e.target.value);
  };

  const handleCreateForum = async () => {
    try {
      const creatorRes = await axios.post(
        "http://localhost:3000/forums/creator",
        { email: email }
      );
      const creator = creatorRes.data.result;
      const response = await axios.post("http://localhost:3000/forums/post", {
        title: newForumTitle,
        creator: creator,
      });

      fetchForums();
      setNewForumTitle("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  };

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(search.toLowerCase())
  );

  // function daysSince(date) {
  //   const now = new Date();
  //   const differenceInTime = now.getTime() - date.getTime();
  //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  //   return Math.floor(differenceInDays);
  // }

  return (
    <>
      <NavigationBar page="forums" />
      <div className="view-container">
        <h1 className="white-text">Forums</h1>
        <Container>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon sx={{ color: "white" }} />}
            style={{ margin: "10px 10px 20px 10px" }}
            onClick={handleOpen}
          >
            Create New Forum
          </Button>
          <TextField
            style={{
              backgroundColor: "white",
              borderRadius: "10px 10px 0 0",
              marginBottom: "15px",
            }}
            variant="filled"
            margin="normal"
            fullWidth
            label="Search Forums"
            value={search}
            onChange={handleSearchChange}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create a new forum</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create a new forum, please enter the forum title here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Forum Title"
                type="text"
                fullWidth
                value={newForumTitle}
                onChange={handleForumTitleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateForum} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {/* <Grid container spacing={3}> */}
          {filteredForums.map((forum) => (
            // <Grid item key={forum.id} xs={12} sm={6} md={4}>
            <Box mb={2} borderBottom={1} borderColor="divider" key={forum.id}>
              <Link
                to={`/posts/${forum.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Card
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#537fe7",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                      variant="h5"
                    >
                      {forum.title}
                    </Typography>
                    <div
                      className="shadow-container"
                      style={{
                        padding: "5px",
                        width: "fit-content",
                        margin: "0",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <PersonIcon
                        style={{ fontSize: "large", marginRight: "5px" }}
                      />
                      <Typography variant="body2">{forum.creator}</Typography>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div
                      className="shadow-container"
                      style={{
                        padding: "10px 5px 10px 5px",
                        margin: "0",
                        textAlign: "center",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MessageIcon style={{ marginRight: "10px" }} />
                      <Typography variant="h6">{forum.posts.length}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Box>
            // </Grid>
          ))}
          {/* </Grid> */}
        </Container>

        <Helmet>
          <title>Forums</title>
        </Helmet>
      </div>
    </>
  );
};

export default Forums;
