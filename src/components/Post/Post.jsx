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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import "./Post.scss";

function Post({ title, text, userName, userId }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
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
          title={
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
            {title}
            </Typography>
        }
          subheader="September 14, 2016"
        />
        <CardContent
        sx={{
            padding: "16px 24px",
            textAlign: "center",
            fontSize: "16px",
        }}
        >
        <Typography variant="body2" color="text.secondary">
            {text}
        </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton 
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={{ color: liked ? "red" : null }}/>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="comments"
            sx={{
              marginLeft: "auto",
              //transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              //transition: "transform 0.3s"
            }}
          >
            <CommentIcon  style={{ color: expanded ? "blue" : null }}/>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Buraya genişletilmiş içerik gelecek...
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
// Note: The Post component is designed to display a post with a title and text.