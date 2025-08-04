import { Card, CardContent, Icon, Input, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { InputAdornment, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import Send from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";


function CommentForm({ userId, userName, postId }) {
    const [text, setText] = useState("");

    const saveComment = () => {
    fetch("/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({
            postId: postId,
            userId: userId,
            text: text
            }),
    })
    .then((res) => res.json())
    .catch((err) => console.log("error", err))
    }

    const handleSubmit = () => {    
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

  return (
    <CardContent 
    className="comment" 
    sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }}>
    <OutlinedInput 
        id="outlined-adornment-amount"
        multiline
        inputProps = {{maxLength : 250}}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={

            <InputAdornment position="start" sx={{ color: blue[500] }}>
                <Link 
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    boxShodow: 'none',
                }}
                className={"Link"} to={`/users/${userId}`}>
                    <Avatar sx={{ 
                        bgcolor: grey[500],
                        width: 24,
                        height: 24,
                        fontSize: '16px',
                     }} 
                     aria-label="recipe" className="commentAvatar">    
                        {userName ? userName.charAt(0).toUpperCase() : "?"}
                    </Avatar>
                </Link>
            </InputAdornment>
        }
        endAdornment={
            <InputAdornment position="end" sx={{ color: blue[500] }}>
                <IconButton aria-label="send" edge="end" 
                onClick={handleSubmit}>
                    <Send />
                </IconButton>
            </InputAdornment>
        }
        style={{ color: 'black', backgroundColor: 'white' }}
        value={text}
         
    ></OutlinedInput>
    </CardContent>
  );
}

export default CommentForm;
// Note: The Comment component displays a user's comment with their username and the comment text.