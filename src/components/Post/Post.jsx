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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';

function Post({ title, text }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
            <CommentIcon />
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