import Box from '@mui/material/Box'
import { useState, useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

import config from "../config"

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const Posts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`${ApiUrl}/posts`)
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
                        <p>{post.content}</p>
                    </Typography>
                </Box>
            )
        })

    )
}

export default Posts