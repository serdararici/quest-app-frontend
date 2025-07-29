import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';

function Navbar() {
    const navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        window.location.reload(); // Sayfayı yenilemek için
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Home
                        </Link>
                    </Typography>
                    <Typography variant="h6">
                        {localStorage.getItem("currentUser") == null ? (
                            <Link to="/auth" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Login/Register
                            </Link>
                        ) : (
                            <div>
                                <IconButton onClick={onClick} sx={{ color: 'white' }}>
                                    <LockOpenIcon />
                                </IconButton>
                                <Link
                                    to={`/users/${localStorage.getItem("currentUser")}`}
                                    style={{ color: 'inherit', textDecoration: 'none', marginLeft: '10px' }}
                                >
                                    Profile
                                </Link>
                            </div>
                        )}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
