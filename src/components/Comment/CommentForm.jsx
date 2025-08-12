import { Card, CardContent, Icon, Input, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { InputAdornment, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import Send from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { PostWithAuth } from "../../services/HttpService";
import { Refresh } from "@mui/icons-material";


function CommentForm({ userId, userName, postId, setCommentRefresh }) {
    const [text, setText] = useState("");

     const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        window.location.reload(); // Sayfayı yenilemek için
    }

    const saveComment = () => {
        PostWithAuth("/comments",{
            postId: postId, 
            userId : userId,
            text : text,
          })
          .then((res) => {
            if(!res.ok) {
                RefreshToken()
                .then((res) => { if(!res.ok) {
                    logout();
                } else {
                   return res.json()
                }})
                .then((result) => {
                    console.log(result)

                    if(result != undefined){
                        localStorage.setItem("tokenKey",result.accessToken);
                        saveComment();
                        setCommentRefresh();
                    }})
                .catch((err) => {
                    console.log(err)
                })
            } else 
            res.json()
        })
          .catch((err) => {
            console.log(err)
          })
    }

const handleSubmit = async () => {    
    if (!text.trim()) return; // Boş yorum gönderilmesini engelle
    
    const result = await saveComment();
    
    if (result.success) {
        setText("");
        setCommentRefresh();
    } else {
        console.error("Comment did not saved", result.error);
    }
};

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