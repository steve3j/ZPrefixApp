import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { useNavigate } from "react-router";
import Icon from "@mui/material/Icon";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const Login = () => {

    return (
            <div>
                <ListItem>
                    <TextField
                        required
                        id="input-username"
                        variant="outlined"
                        label="username"
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        required
                        id="input-password"
                        variant="outlined"
                        label="password"
                    />
                </ListItem>
                <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        id="btn-login"
                        variant="contained"
                    >
                        Login
                    </Button>
                </ListItem>
                <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        id="btn-login"
                        variant="outlined"
                    >
                        Create Account
                    </Button>
                </ListItem>
            </div>
    );
}

export default Login