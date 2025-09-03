import { CardContent, OutlinedInput, InputAdornment, Avatar, IconButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Send from "@mui/icons-material/Send";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";
import { callWithAuth } from "../../utils/auth";

function CommentForm({ userId, userName, postId, setCommentRefresh }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const saveComment = async () => {
    const response = await callWithAuth(PostWithAuth, {
      url: "/comments",
      body: {
        postId,
        userId,
        text,
      }
    });

    if (response.success) {
      console.log("Yorum başarıyla kaydedildi:", response.data);
      return { success: true, data: response.data };
    } else {
      console.error("Yorum kaydedilemedi:", response.error);
      return { success: false, error: response.error };
    }
  };


  const handleSubmit = async () => {
    if (!text.trim() || loading) {
      console.log("Boş yorum veya loading durumu");
      return;
    }

    console.log("Form submit edildi");
    setLoading(true);
    
    try {
      const result = await saveComment();
      
      if (result.success) {
        console.log("Yorum başarıyla eklendi, form temizleniyor");
        setText("");
        setCommentRefresh((prev) => !prev); // listeyi yeniden yükle
      } else {
        console.error("Yorum eklenemedi:", result.error);
      }
    } catch (error) {
      console.error("HandleSubmit hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(e) => setText(e.target.value)}
        value={text}
        startAdornment={
          <InputAdornment position="start" sx={{ color: blue[500] }}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                boxShadow: "none",
              }}
              to={`/users/${userId}`}
            >
              <Avatar
                sx={{
                  bgcolor: grey[500],
                  width: 24,
                  height: 24,
                  fontSize: "16px",
                }}
              >
                {userName ? userName.charAt(0).toUpperCase() : "?"}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" sx={{ color: blue[500] }}>
            <IconButton
              aria-label="send"
              edge="end"
              onClick={handleSubmit}
              disabled={loading}
            >
              <Send />
            </IconButton>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      />
    </CardContent>
  );
}

export default CommentForm;
