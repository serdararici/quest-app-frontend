import { Card, CardContent, Input, OutlinedInput } from "@mui/material";
import  React from "react";
import { InputAdornment, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";


function Comment({ userId, userName, text }) {

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
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps = {{maxLength : 250}}
        fullWidth
        value={text}
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
        style={{ color: 'black', backgroundColor: 'white' }}
         
    ></OutlinedInput>
    </CardContent>
  );
}

export default Comment;
// Note: The Comment component displays a user's comment with their username and the comment text.