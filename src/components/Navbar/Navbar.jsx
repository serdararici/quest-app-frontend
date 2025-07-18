import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

function Navbar() {
    let userId = 5;
    
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
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', textAlign: 'left'
                         }}>
                            Home
                        </Link>
                    </Typography>
                        <Link to={`/users/${userId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            User
                        </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;