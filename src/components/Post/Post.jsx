
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Container
} from '@mui/material';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth, DeleteWithAuth } from "../../services/HttpService";
import "./Post.scss";
import { callWithAuth } from "../../utils/auth";
import { GetWithAuth } from "../../services/HttpService";

function Post({ title, text, userName, userId, postId, likes }) {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const isInitialMount = useRef(true);

  const disabled = !localStorage.getItem("currentUser");

  // Kullanıcının mevcut like durumunu kontrol et
  const checkLikes = () => {
    const existingLike = likes.find(
      l => "" + l.userId === localStorage.getItem("currentUser")
    );
    if (existingLike) {
      setLikeId(existingLike.id);
      setIsLiked(true);
    }
  };


  // Like ekleme
  const saveLike = async () => {
    const response = await callWithAuth(PostWithAuth, {
       url: "/likes",
        body: {
           postId,
            userId: localStorage.getItem("currentUser") 
        }
      });
    if (response.success && response.data?.id) {
      setLikeId(response.data.id);
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
      return true;
    } else if (response.error) {
      console.error("error saving like", response.error);
      return false;
    }
  };


  // Like silme
  const deleteLike = async () => {
    if (!likeId) return false;

    const response = await callWithAuth(DeleteWithAuth, { url: `/likes/${likeId}` });
    if (response.success) {
      setIsLiked(false);
      setLikeId(null);
      setLikeCount(prev => prev - 1);
      return true;
    } else if (response.error) {
      console.log("error deleting like", response.error);
      return false;
    }
  };

  const handleLike = async () => {
    if (likeLoading || disabled) return;

    setLikeLoading(true);
    
    try {
      if (!isLiked) {
        await saveLike();
      } else {
        await deleteLike();
      }
    } catch (error) {
      console.error("Like işlemi hatası:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  const refreshComments = async () => {
    try {
      const response = await callWithAuth(GetWithAuth, { 
        url: `/comments?postId=${postId}` 
      });
      
      if (response.success) {
        setCommentList(response.data || []);
        setIsLoaded(true);
        setRefresh(false);
        setError(null);
      } else {
        console.error("Yorumlar yüklenemedi:", response.error);
        setError(response.error);
        setIsLoaded(true);
        setRefresh(false);
      }
    } catch (error) {
      console.error("refreshComments hatası:", error);
      setError(error);
      setIsLoaded(true);
      setRefresh(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const setCommentRefresh = () => setRefresh(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments();
    }
  }, [refresh]);

  useEffect(() => {
    checkLikes();
  }, [likes]);

  return (
    <div className="postContainer">
      <Card sx={{ width: { xs: "90vw", sm: "500px", md: "700px", lg: "800px" }, margin: "20px", boxShadow: 3, borderRadius: 3, textAlign: "left" }}>
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Avatar sx={{ bgcolor: blue[500] }}>{userName?.charAt(0).toUpperCase() || "?"}</Avatar>
            </Link>
          }
          action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
          title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>{title}</Typography>}
          subheader="September 14, 2016"
        />
        <CardContent sx={{ textAlign: "center", fontSize: "16px" }}>
          <Typography variant="body2" color="text.secondary">{text}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={handleLike} disabled={disabled} aria-label="like">
            <FavoriteIcon sx={{ color: isLiked ? "red" : null }} />
          </IconButton>
          <Typography sx={{ marginLeft: 1 }}>{likeCount}</Typography>
          <IconButton aria-label="share"><ShareIcon /></IconButton>
          <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="comments" sx={{ marginLeft: "auto" }}>
            <CommentIcon sx={{ color: expanded ? blue[500] : null }} />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error ? "Error loading comments." :
              isLoaded ?
                commentList.length > 0 ?
                  commentList.map(comment => <Comment key={comment.id} {...comment} />) :
                  <Typography sx={{ color: "gray", fontStyle: "italic" }}>No comments yet.</Typography>
                : "Loading..."
            }
            {!disabled && <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentRefresh={setCommentRefresh} />}
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;


/*
import React, { use, useReducer, useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Container
} from '@mui/material';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import "./Post.scss";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth } from "../../services/HttpService";
import { DeleteWithAuth } from "../../services/HttpService";
import { Delete } from "@mui/icons-material";



function Post({ title, text, userName, userId, postId, likes }) {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [refresh, setRefresh] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;


   const setCommentRefresh = () => {
     setRefresh(true);
   }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  }

  const refreshComments = () => { 
        fetch("/comments?postId=" + postId , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("tokenKey"),
        }
    })
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              setCommentList(result);
              setRefresh(false);
          },
          (error) => {
              console.log("error", error);
              setIsLoaded(true);
              setError(error);
              setRefresh(false);
          }
      )
      
    }

    const saveLike = () => {
      PostWithAuth(`/likes`, {
          postId: postId,
          userId: localStorage.getItem("currentUser"),
      })
     .then((res) => res.json())
     .catch((err) => console.log("error", err))
    }

    const deleteLike = () => {
      DeleteWithAuth(`/likes/${likeId}`)
      .catch((err) => console.log("error", err))
    }


    const checkLikes = () => {
      var likeContrtol = likes.find(like => "" + like.userId === localStorage.getItem("currentUser"));
      if(likeContrtol != null) {
        setLikeId(likeContrtol.id);
      }
      setIsLiked(likeContrtol ? true : false);
    }

  useEffect(() => {
    if(isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      refreshComments();
    }
  }, [refresh]);

  useEffect(() => { 
    checkLikes(); 
  }, [likes]);


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
          {disabled ? 
          <IconButton 
          disabled
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={{ color: isLiked ? "red" : null }}>
            </FavoriteIcon>
          </IconButton> : 
          <IconButton 
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={{ color: isLiked ? "red" : null }}>
            </FavoriteIcon>
          </IconButton>}

          <Typography sx={{ marginLeft: 1 }}>{likeCount}</Typography>
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
            <CommentIcon  style={{ color: expanded ? blue[500] : null }}/>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container
            sx={{

            }}
            fixed>
           {error 
            ? "Error loading comments." 
            : isLoaded 
              ? commentList.length > 0 
                ? commentList.map(comment => (
                    <Comment 
                      key={comment.id}
                      userId={comment.userId} 
                      userName={comment.userName} 
                      text={comment.text} 
                    />
                  ))
                : <Typography sx={{ color: "gray", fontStyle: "italic" }}>
                    No comments yet.
                  </Typography>
              : "Loading..."}


          {disabled ? "" :
            <CommentForm 
                userId={localStorage.getItem("currentUser")} 
                userName={localStorage.getItem("userName")} 
                postId= {postId}
                setCommentRefresh={setCommentRefresh}>
            </CommentForm>}
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}
export default Post;
// Note: The Post component is designed to display a post with a title and text
*/