import Box from '@mui/material/Box'
import { useState, useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useCookies } from "react-cookie";
import {UserContext } from '../Context/UserContext'
import {useParams} from "react-router-dom"


import config from "../config"

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const UserPosts = () => {
    const [posts, setPosts] = useState([])
    const [cookies, setCookie] = useCookies(["name"]);
    const [user, setUser] = useContext(UserContext);
    const params = useParams()
    // console.log(params)

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


    return (
        posts.map((post) => {
            // { console.log(post) }
            return (
                <Box border="solid" borderRadius='8px' margin='5px'>
                    <h3>{post.title}</h3>
                    <Divider />
                    
                    <Typography margin='5px' align="justify">
                        <span>{post.content}</span>
                    </Typography>
                </Box>
            )
        })

    )
}

export default UserPosts