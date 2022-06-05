import Box from '@mui/material/Box'
import { useState, useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useCookies } from "react-cookie";
import { UserContext } from '../Context/UserContext'
import { useParams } from "react-router-dom"
import moment from 'moment'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router';


import config from "../config"

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const UserPosts = () => {
    const [posts, setPosts] = useState([])
    const [cookies, setCookie] = useCookies(["name"]);
    const [user, setUser] = useContext(UserContext);
    let params = useParams()
    // console.log(params)

    const navigate = useNavigate();
    const navHandler = (path) => {
        navigate(path)
    };

    function lengthHelper(inputText) {
        if (inputText.length > 100) {
            return inputText.slice(0, 100) + '...'
        } else {
            return inputText
        }
    }

    useEffect(() => {
        fetch(`${ApiUrl}/user/${params.id}/posts`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw "Error"
                }
            })
            .then((data) => {
                setPosts(data)
            })
            .catch((err) => console.error(err))
    }, [])

    function dateHelper(inputDate) {
        // console.log(inputDate)
        let m = moment(inputDate)
        // console.log(m)
        return m.utc().format('L')
    }


    return (
        posts.map((post) => {
            // console.log(post)
            // { console.log(post) }
            return (
                <Box key={post.id} margin='8px' >
                    <Paper elevation='4'>
                        <Button onClick={() => navHandler(`/post/${post.id}`)} margin='5px' sx={{ textTransform: 'none', width: '100%', color: 'black', display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box display='flex' sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div flexbasis='1'  >Author: {post.username}</div>
                                <h3 textalign='center'>{post.title}</h3>
                                <div flexbasis='1' >{dateHelper(post.creation_date)}</div>
                            </Box>
                            <Divider sx={{ width: '100%' }} />

                            <Typography sx={{ width: '100%' }} margin='5px' align="justify">
                                <TextField variant="standard"
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    fullWidth multiline disabled value={lengthHelper(post.content)}>
                                </TextField>
                            </Typography>

                        </Button>
                    </Paper>
                </Box>
            )
        })

    )
}

export default UserPosts