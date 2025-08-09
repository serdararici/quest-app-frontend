import React, { useState, useEffect, use } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./UserActivity.scss";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Post from "../Post/Post";

const columns = [
    {
        id: 'User Activity',
        label: 'User Activity',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function PopUp(props) {
    const {isOpen, postId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen); 
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);

    const getPost = () => {
        if (!postId) return;
        
        setLoading(true)
        fetch("/posts/" + postId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            }
        })
        .then((res) => res.json())
        .then(
            (result) => {
                console.log(result);
                setPost(result);
                setLoading(false);
            },
            (error) => {
                console.log("Error fetching post:", error);
                setLoading(false);
            }
        );
    }


    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
        if (postId && isOpen) {
            getPost();
        }
    }, [postId, isOpen]);

    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    Loading...
                </div>
            ) : (
                <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text}></Post>
            )}
      </Dialog>
    );
}

function UserActivity(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const { userId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getActivity = () => {
    if (!userId) return;
    console.log("Fetching user activity for userId:", userId);
    const token = localStorage.getItem("tokenKey");
    console.log("Token from localStorage:", token);

    fetch("/users/activity/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("tokenKey"),
        }
    })
      .then((res) => {
            if (!res.ok) {
                throw new Error("HTTP error! status: " + res.status);
            }
            return res.json();
        })
      .then(
        (result) => {
            console.log("result: " + result);
          setIsLoaded(true);
          setRows(result);
        },
        (error) => {
            console.log("error getactivity" + error);
            setIsLoaded(true);
            setError(error);
        }
      );
  }

    useEffect(() => {
        if (userId) {
        getActivity();
        }
    }, [userId]);   


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  };

  if (error) {
        return (
            <Paper className="root">
                <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                    Error loading activity: {error.message}
                </div>
            </Paper>
        );
    }

  return (
    <div>
    {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
    <Paper className="root">
      <TableContainer className="container">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell colSpan={3} align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    User Activity
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoaded ? (
                <TableRow>
                    <TableCell colSpan={3} align="center">
                        Loading...
                    </TableCell>
                </TableRow>
            ) : rows.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={3} align="center" style={{ fontStyle: 'italic' }}>
                        No activity found.
                    </TableCell>
                </TableRow>
            ) : (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow 
                        key={index} 
                        hover 
                        role="button" 
                        tabIndex={-1}
                        onClick={() => handleNotification(row[1])}
                        style={{ cursor: 'pointer' }}
                    >
                        <TableCell align="left">
                            {row[3] + " " + row[0] + " your post"}
                        </TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 0 && (
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )}
    </Paper>
    </div>
  );
}

export default UserActivity;
