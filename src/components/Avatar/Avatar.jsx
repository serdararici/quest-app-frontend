
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Radio from '@mui/material/Radio';
import ListItemText from '@mui/material/ListItemText';

const style = {
  position: 'absolute', 
}


function Avatar(props) {
    const { avatarId } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(avatarId);


    const saveAvatar = () => {
        fetch(`/users/${localStorage.getItem("currentUser")}/avatar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({
            avatarId: selectedValue 
        }),
        })
        .then(res => res.json())
        .then(data => {
            console.log("Avatar updated:", data);
        })
        .catch(err => {
            console.log("Error saving avatar:", err);
        });

    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);  
    }

    const handleOpen = () => {
        setOpen(true);  
    }

    const handleClose = () => {
        setOpen(false); 
        saveAvatar();
    }

    return (
        <div>

            <Card sx={{ maxWidth: 345,
                width: '100%',
                margin: '20px auto',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
            <CardMedia
            component={"img"}
                sx={{

                }}
                alt="User Avatar"
                image={`/avatars/avatar${selectedValue}.png`}
                title="User Avatar"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.userName ? props.userName : "User Name"}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                User Info 
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="small" color='primary' onClick={handleOpen}>Change Avatar</Button>
            </CardActions>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                <Box
                    sx={{
                    width: 320,
                    maxHeight: 500,
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Choose an Avatar
                    </Typography>

                    <List dense>
                    {[1, 2, 3, 4, 5, 6].map((key) => {
                        const labelId = `checkbox-list-secondary-label-${key}`;
                        return (
                        <ListItem key={key} button>
                            <CardMedia
                            component="img"
                            alt={`Avatar n°${key}`}
                            image={`/avatars/avatar${key}.png`}
                            title={`Avatar ${key}`}
                            sx={{
                                maxWidth: 60,
                                height: 60,
                                mr: 2,
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                            />
                            <ListItemSecondaryAction>
                            <Radio
                                edge="end"
                                value={key}
                                onChange={handleChange}
                                checked={"" + selectedValue === "" + key}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                            </ListItemSecondaryAction>
                        </ListItem>
                        );
                    })}
                    </List>
                </Box>
            </Modal>
            

            
        </div>
        
    
  );
}

export default Avatar;
