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
import { MenuStateContext } from "../Context/MenuStateContext";
import config from '../config';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Register = () => {
    const [menuState, setMenuState] = React.useContext(MenuStateContext)

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault()
        let firstName = document.getElementById("input-firstName").value;
        let lastName = document.getElementById("input-lastName").value;
        let username = document.getElementById("input-username").value;
        let password = document.getElementById("input-password").value;

        let header = {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                creation_date: new Date()
            }),
        };

        fetch(`${ApiUrl}/registration`, header)
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    console.log("code: ", response.status, "\nmessage: ", response.statusText);
                    return false;
                }
            })
            .then((data) => {
                if (data) {
                    setMenuState('login')
                    // navigate("/");
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    return (
        <div>
            <ListItem>
                <TextField
                    required
                    id="input-firstName"
                    variant="outlined"
                    label="first name"
                />
            </ListItem>
            <ListItem>
                <TextField
                    required
                    id="input-lastName"
                    variant="outlined"
                    label="last name"
                />
            </ListItem>
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
                    id="btn-create-account"
                    variant="contained"
                    // onClick={() => setMenuState('loggedIn')}
                    onClick={(e) => register(e)}
                >
                    Create Account
                </Button>
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    id="btn-back"
                    variant="outlined"
                    color="error"
                    onClick={() => setMenuState('login')}
                >
                    Back
                </Button>
            </ListItem>
        </div>
    );
}

export default Register