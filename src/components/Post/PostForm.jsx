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
import { Link } from 'react-router-dom';
import "./Post.scss";

function PostForm({userName, userId }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

  const savePost = () => {
    fetch("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            userId: userId,
            text: text
            }),
    })
    .then((res) => res.json())
    .catch((err) => console.log("error", err))
  }

  const handleSubmit = () => {
    savePost();
  }

  const handleTitle = (value) => {
    setTitle(value);
  }

  const handleText = (value) => {
    setText(value);
  }

  return (
    <div className="postContainer">
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