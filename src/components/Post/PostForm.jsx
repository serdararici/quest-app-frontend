import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OutlinedInput from '@mui/material/OutlinedInput';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import "./Post.scss";
import { PostWithAuth } from "../../services/HttpService";

function PostForm({userName, userId, refreshPosts }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    PostWithAuth("/posts", {
        title: title,
        userId: userId,
        text: text
    })
    .then((res) => res.json())
    .catch((err) => console.log("error", err))
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  }

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  }

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };


  return (
    
    <div className="postContainer">

      <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your post is sent!
        </Alert>
      </Snackbar>

      <Card
        sx={{
            width: { xs: "90vw", sm: "500px", md: "700px", lg: "800px" },
            maxWidth: "100%",
            margin: "20px",
            boxShadow: 3,
            borderRadius: 3,
            textAlign: "left",
        }}
      >
        <CardHeader
            sx={{
                textAlign: "left",
                padding: "16px 24px",
            }}
          avatar={
            <Link to={`/users/${userId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
               <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {userName ? userName.charAt(0).toUpperCase() : "?"}
            </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={ <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            inputProps = {{maxLength : 25}}
            fullWidth
            value={title}
            placeholder="Title"
            sx={{ fontSize: "24px", fontWeight: "bold" }}
            onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
        }
        />
        <CardContent
        sx={{
            padding: "16px 24px",
            textAlign: "center",
            fontSize: "16px",
        }}
        >
       <Typography variant="body2" color="text.secondary" component="div">
        <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            inputProps = {{maxLength : 250}}
            fullWidth
            value={text}
            placeholder="Text"
            onChange={(i) => handleText(i.target.value)}
            endAdornment={
              <InputAdornment position="end" sx={{ color: blue[500] }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Post 
                </Button>
              </InputAdornment>
            }
            ></OutlinedInput>
        </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
// Note: The Post component is designed to display a post with a title and text.