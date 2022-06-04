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
import { UserContext } from '../Context/UserContext';
import { useCookies } from "react-cookie";
import config from '../config';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

let errorMessage = ""
let errorPassword = false

const Login = () => {
    const [menuState, setMenuState] = React.useContext(MenuStateContext)
    const [cookies, setCookie] = useCookies(["name"]);
    const [user, setUser] = React.useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        let username = document.getElementById("input-username").value;
        let password = document.getElementById("input-password").value;
        let errorSpan = document.getElementById("error-span");
        if (username === "" || password === "") {
            errorSpan.innerHTML = "Please complete all fields.";
        } else {
            let headers = {
                method: "POST",
                mode: "cors",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            };
            fetch(`${ApiUrl}/login`, headers)
                .then((res) => {
                    if (res.status === 201) {
                        return res.json();
                    } else if (res.status === 403) {
                        errorMessage = "Incorrect Username and Password.";
                        throw new Error("Incorrect Username and Password");
                    } else if (res.status === 500) {
                        console.log("status 500");
                        throw new Error("Error");
                    }
                })
                .then((data) => {
                    // console.log(data.accessToken)
                    let payloadString = atob(data.accessToken.split(".")[1]).replaceAll("[", "").replaceAll("]", "");
                    // console.log(payloadString)
                    let payloadData = JSON.parse(payloadString);
                    console.log('pdata: ', payloadData)
                    setCookie("blog-user", data.accessToken);
                    setUser({
                        id: payloadData.id,
                        firstName: payloadData.first_name,
                        username: payloadData.last_name,
                        password: payloadData.password,
                        creation_date: payloadData.creation_date
                    });
                    setMenuState('loggedIn')
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };


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
                    // onClick={() => setMenuState('loggedIn')}
                    onClick={(e) => login(e)}
                >
                    Login
                </Button>
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    id="btn-register"
                    variant="outlined"

                    onClick={() => setMenuState('register')}
                >
                    Create Account
                </Button>

            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <span id="error-span" style={{ color: "red" }}>
                </span>
            </ListItem>
        </div>
    );
}

export default Login