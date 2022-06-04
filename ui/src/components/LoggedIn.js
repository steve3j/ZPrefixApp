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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { MenuStateContext } from "../Context/MenuStateContext";
import { UserContext } from "../Context/UserContext";
import { useCookies } from "react-cookie";
import { useEffect } from 'react';




const username = 'sgioja'
const id = 1
const LoggedIn = () => {
    const [menuState, setMenuState] = React.useContext(MenuStateContext)
    let [user, setUser] = React.useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);

    const navigate = useNavigate();
    const navHandler = (path) => {
        navigate(path)
    };

    useEffect(() => {
        navHandler(`/user/${user.id}/posts`)
    }, [])

    const handleLogout = () => {
        removeCookie("blog-user");
        setUser({});
        setMenuState('login')
        // console.log(menuState)
    }

    const menuItems = [
        {
            label: "New Post",
            action: () => '',
            icon: <PostAddIcon />,
        },
        {
            label: "My Posts",
            action: () => {
                navHandler(`/user/${user.id}/posts`)
            },
            icon: <AssignmentIndIcon />,
        },
    ]


    return (
        <div>
            <ListItem key="username">
                <ListItemIcon>
                    <Icon><AccountCircleIcon /></Icon>
                </ListItemIcon>
                <ListItemText primary={user.username} secondary="logged in" />
            </ListItem>
            <Divider />
            {menuItems.map(({ label, action, icon }) => (
                <ListItem button key={label} onClick={action}>
                    <ListItemIcon>
                        <Icon>{icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
            ))}

            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    id="btn-logout"
                    variant="contained"
                    onClick={() => handleLogout()}
                // onClick={() => setMenuState('login')}
                >
                    Log Out
                </Button>
            </ListItem>
        </div>
    );
}

export default LoggedIn