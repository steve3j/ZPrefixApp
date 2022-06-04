import Box from '@mui/material/Box'
import { useState, useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { UserContext } from '../Context/UserContext'
import moment from 'moment'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router';

import config from "../config"

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const CreatePost = () => {
    const [posts, setPosts] = useState([])
    const [titleProps, setTitleProps] = useState({})
    const [contentProps, setContentProps] = useState({})
    const [user, setUser] = useContext(UserContext);

    const navigate = useNavigate();
    const navHandler = (path) => {
        navigate(path)
    };

    function dateHelper(inputDate) {
        // console.log(inputDate)
        let m = moment(inputDate)
        // console.log(m)
        return m.format('L')
    }

    function onTitleChange(e) {
        if (e.target.value === '') {
            setTitleProps({ error: true })
        }
        else {
            setTitleProps({})
        }
    }
    function onContentChange(e) {
        if (e.target.value === '') {
            setContentProps({ error: true })
        }
        else {
            setContentProps({})
        }
    }

    const createNewPost = (e) => {
        e.preventDefault()
        let title = document.getElementById("input-title").value;
        let content = document.getElementById("input-content").value;
        let date = document.getElementById("input-date").innerHTML;
        let user_id = user.id;

        let errFlag = false
        if (title.length < 1) {
            setTitleProps({ error: true, label: "title required" })
            errFlag = true
        }
        if (content.length < 1) {
            setContentProps({ error: true, label: "content required" })
            errFlag = true
        }
        if (errFlag) {
            return
        }

        let header = {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                title: title,
                content: content,
                creation_date: date
            }),
        };

        fetch(`${ApiUrl}/post`, header)
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
                    console.log(data)
                    navHandler(`/user/${user.id}/posts`)
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    return (
        // { console.log(post) }
        <div>
            <Paper elevation='4' sx={{ margin: '5px' }}>
                <Box margin='8px' >
                    <Box display='flex' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div flexbasis='1'  >Author: {user.username}</div>
                        <h3 textalign='center'>
                            <TextField
                                onChange={onTitleChange}
                                required
                                label="title"
                                id="input-title"
                                {...titleProps}
                            ></TextField></h3>
                        <div flexbasis='1' id="input-date">{dateHelper(new Date())}</div>
                    </Box>
                    <Divider />

                    <Typography align="justify">
                        <TextField
                            onChange={onContentChange}
                            required
                            label="content"
                            id="input-content" sx={{ marginBottom: '5px', marginTop: '5px' }}
                            {...contentProps}
                            fullWidth multiline >
                        </TextField>
                    </Typography>
                </Box>
            </Paper>
            <Box display='flex' justifyContent='center'>
                <Button sx={{ margin: '5px' }} variant='contained' onClick={(e) => createNewPost(e)}>
                    Submit
                </Button>
            </Box>
        </div>

    )


}

export default CreatePost