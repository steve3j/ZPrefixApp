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
import Login from "./Login"
import Register from './Register';
import LoggedIn from './LoggedIn';

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Menu = () => {


    const menuItems = [
        {
            label: "All Posts",
            action: '',
            icon: <DynamicFeedIcon />,
        },
    ];

    const drawerWidth = 240;

    let loginState = 'loggedIn'

    function displayLoginState(state) {
        if (state === 'login') {
            return <Login />
        }
        else if (state === 'loggedIn')
            return <LoggedIn />
        else if (state === 'register')
            return <Register />
    }
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem display='flex' sx={{ justifyContent: 'center' }} >
                        <Box  >
                            <ListItemText >
                                <h1>Bloggy</h1>
                            </ListItemText>
                        </Box>

                    </ListItem>
                    <Divider />
                    {menuItems.map(({ label, action, icon }) => (
                        <ListItem button key={label} >
                            <ListItemIcon>
                                <Icon>{icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    ))}
                    <Divider />
                    {displayLoginState(loginState)}
                    <Divider />
                </List>
            </Box>
        </Drawer>
    );
}

export default Menu