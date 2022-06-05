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
import { useParams } from "react-router-dom"

import config from "../config"
import PostAdd from '@mui/icons-material/PostAdd';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const ViewEditPost = () => {
    const [post, setPost] = useState([{ username: '', title: '', content: '', creation_date: '' }])
    const [titleProps, setTitleProps] = useState({})
    const [contentProps, setContentProps] = useState({})
    const [editPermissionProps, setEditPermissionProps] = useState({ disabled: true })
    const [deletePermissionProps, setDeletePermissionProps] = useState({ disabled: true })
    const [submitPermissionProps, setSubmitPermissionProps] = useState({ disabled: true })
    const [buttonText, setButtonText] = useState('Edit')
    const [user, setUser] = useContext(UserContext);
    const params = useParams()

    const navigate = useNavigate();
    const navHandler = (path) => {
        navigate(path)
    };

    function dateHelper(inputDate) {
        // console.log(inputDate)
        let m = moment(inputDate)
        // console.log(m)
        return m.utc().format('L')
    }



    function editButtonHelper() {
        if (buttonText === 'Edit') {
            setButtonText('Cancel')
            setSubmitPermissionProps({ disabled: false })
            setDeletePermissionProps({ disabled: true })
            setEditPermissionProps({ variant: 'outlined' })
            setContentProps({ ...contentProps,  disabled: false })
            setTitleProps({ ...titleProps, variant: 'outlined', disabled: false })
        } else {
            setButtonText('Edit')
            setSubmitPermissionProps({ disabled: true })
            setDeletePermissionProps({ disabled: false })
            setEditPermissionProps({ variant: 'contained' })
            setContentProps({ ...contentProps, disabled: true })
            setTitleProps({ ...titleProps, variant: 'standard', disabled: true })
        }
    }

    function onTitleChange(e) {
        if (e.target.value === '') {

            setTitleProps({ ...titleProps, error: true, value: e.target.value })
        }
        else {
            setTitleProps({ ...titleProps, error: false, value: e.target.value })
        }
    }
    function onContentChange(e) {
        if (e.target.value === '') {
            setContentProps({ ...contentProps, error: true, value: e.target.value })
        }
        else {
            setContentProps({ ...contentProps, error: false, value: e.target.value })
        }
        // console.log(e.target.value)
    }

    //get data
    useEffect(() => {
        fetch(`${ApiUrl}/post/${params.id}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw "Error"
                }
            })
            .then((data) => {
                setPost(data)
                console.log(post)

                if (buttonText !== 'Cancel') {
                    setTitleProps({ ...titleProps, disabled: true, value: data[0].title })
                    setContentProps({ ...contentProps, disabled: true, value: data[0].content })

                    if (user.id === data[0].user_id) {
                        setEditPermissionProps({ disabled: false })
                        setDeletePermissionProps({ disabled: false })
                    }
                    else {
                        setEditPermissionProps({ disabled: true })
                        setDeletePermissionProps({ disabled: true })
                    }
                }

                
                // console.log(data[0].content)

            })
            .catch((err) => console.error(err))
    }, [buttonText])

    //edit post
    const submitPost = (e) => {
        e.preventDefault()
        let title = titleProps.value;
        let content = contentProps.value;
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
            method: "put",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                title: title,
                content: content,
                // creation_date: date
            }),
        };

        fetch(`${ApiUrl}/post/${post[0].id}`, header)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("code: ", response.status, "\nmessage: ", response.statusText);
                    return false;
                }
            })
            .then((data) => {
                if (data) {
                    // console.log(data)
                    navHandler(`/post/${post[0].id}`)
                    editButtonHelper()
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    return (

        <div>
            {/* {console.log('post, ', post)} */}
            <Paper elevation='4' sx={{ margin: '5px' }}>
                <Box margin='8px' >
                    <Box minHeight='66px' display='flex' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div flexbasis='1'  >Author: {post[0].username}</div>
                        <h3 textalign='center'>
                            <TextField
                                variant="standard"
                                {...titleProps}
                                inputProps={{ style: { textAlign: 'center', fontWeight: 'bold' } }}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                onChange={(e) => onTitleChange(e)}
                                required
                                id="input-title"
                            ></TextField></h3>
                        <div flexbasis='1' id="input-date">{dateHelper(post[0].creation_date)}</div>
                    </Box>
                    <Divider />

                    <Typography minHeight='66px' align="justify">
                        <TextField
                            {...contentProps}
                            inputProps={{ minHeight: '66px' }}
                            // InputProps={{
                            //     disableUnderline: true,
                            // }}
                            onChange={(e) => onContentChange(e)}
                            required
                            // value={post[0].content}
                            id="input-content" sx={{ marginBottom: '5px', marginTop: '5px' }}
                            fullWidth multiline >
                        </TextField>
                    </Typography>
                </Box>
            </Paper>
            <Box display='flex' justifyContent='center'>
                <Button
                    id='button-delete'
                    color="error"
                    sx={{ margin: '5px' }}
                    variant='outlined'
                    onClick={(e) => (e)}
                    {...deletePermissionProps}>
                    Delete Post
                </Button>
                <Button
                    id='button-edit'
                    sx={{ margin: '5px', width: '95px' }}
                    variant='contained'
                    onClick={() => editButtonHelper()}
                    {...editPermissionProps}>
                    {buttonText}
                </Button>
                <Button
                    id='button-submit'
                    sx={{ margin: '5px', width: '95px' }}
                    variant='contained'
                    onClick={(e) => submitPost(e)}
                    {...submitPermissionProps}>
                    Submit
                </Button>
            </Box>
        </div>
    )
}

export default ViewEditPost