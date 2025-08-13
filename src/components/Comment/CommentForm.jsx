import { CardContent, OutlinedInput, InputAdornment, Avatar, IconButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Send from "@mui/icons-material/Send";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

function CommentForm({ userId, userName, postId, setCommentRefresh }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    window.location.href = '/login'; // Sayfayı yenilemek için
  };

  const saveComment = async (isRetry = false) => {
    try {
      console.log("Yorum gönderiliyor...", { postId, userId, text });
      
      const res = await PostWithAuth("/comments", {
        postId,
        userId,
        text,
      });

      console.log("API yanıtı:", res.status, res.ok);

      if (!res.ok) {
        // Eğer bu zaten bir retry ise, logout yap
        if (isRetry) {
          console.log("Retry başarısız, logout yapılıyor");
          logout();
          return { success: false, error: "Token yenileme başarısız" };
        }

        console.log("Token yenileniyor...");
        // Token süresi dolmuş olabilir
        const refreshRes = await RefreshToken();
        
        if (!refreshRes.ok) {
          console.log("RefreshToken başarısız:", refreshRes.status);
          logout();
          return { success: false, error: "Refresh token geçersiz" };
        }

        const tokens = await refreshRes.json();
        console.log("Yeni token alındı");
        localStorage.setItem("tokenKey", tokens.accessToken);
        
        // Yeniden dene (isRetry = true ile)
        return await saveComment(true);
      }

      const data = await res.json();
      console.log("Yorum başarıyla kaydedildi:", data);
      return { success: true, data };
      
    } catch (err) {
      console.error("Yorum kaydedilirken hata:", err);
      return { success: false, error: err };
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
        // Hata mesajı gösterebilirsiniz
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


/*
import { CardContent, OutlinedInput, InputAdornment, Avatar, IconButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Send from "@mui/icons-material/Send";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

function CommentForm({ userId, userName, postId, setCommentRefresh }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  const saveComment = async () => {
    try {
      const res = await PostWithAuth("/comments", {
        postId,
        userId,
        text,
      });

      if (!res.ok) {
        // token süresi dolmuş olabilir
        const refreshRes = await RefreshToken();
        if (!refreshRes.ok) {
          logout();
          return { success: false };
        }
        const tokens = await refreshRes.json();
        localStorage.setItem("tokenKey", tokens.accessToken);
        return await saveComment(); // yeniden dene
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      console.error("Yorum kaydedilirken hata:", err);
      return { success: false, error: err };
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;

    setLoading(true);
    const result = await saveComment();
    setLoading(false);

    if (result.success) {
      setText("");
      setCommentRefresh((prev) => !prev); // listeyi yeniden yükle
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
*/




/*
import { Card, CardContent, Icon, Input, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { InputAdornment, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import Send from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { PostWithAuth } from "../../services/HttpService";
import { Refresh } from "@mui/icons-material";
import { RefreshToken } from "../../services/HttpService";


function CommentForm({ userId, userName, postId, setCommentRefresh }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

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
    if (!text.trim() || loading) return; // Boş yorum gönderilmesini engelle
    
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
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    boxShadow: 'none',
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
*/