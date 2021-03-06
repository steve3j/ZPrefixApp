import './App.css';
import Menu from "./components/Menu"
import Box from '@mui/material/Box'
import Posts from './components/Posts'
import UserPosts from './components/UserPosts'
import CreatePost from './components/CreatePost';
import ViewEditPost from './components/ViewEditPost';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from './Context/UserContext';
import { MenuStateContext } from './Context/MenuStateContext';
import { React, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      disabled: '#black',
    }
  },
});

function App() {
  let [user, setUser] = useState({})
  const [cookies, setCookie] = useCookies(["name"]);
  const [menuState, setMenuState] = useState('login')

  if (Object.keys(user).length === 0 && document.cookie.includes("blog-user")) {
    let payloadString = atob(cookies["blog-user"].split(".")[1]).replaceAll("[", "").replaceAll("]", "");
    let payloadData = JSON.parse(payloadString);
    setUser({
      id: payloadData.id,
      firstName: payloadData.first_name,
      username: payloadData.last_name,
      password: payloadData.password,
      creation_date: payloadData.creation_date
    });
  }

  useEffect(() => {
    if (!document.cookie.includes("blog-user")) {
      setUser({});
      // console.log('here1')
      // console.log(menuState)

    } else {
      // console.log('here2')
      // console.log(menuState)
      setMenuState('loggedIn')
      // console.log(document.cookie)
      let allCookies = document.cookie.split(";");
      let cookie = allCookies.find((element) => element.includes("blog-user"));
      let payloadString = atob(cookie.split(".")[1]).replaceAll("[", "").replaceAll("]", "");
      let payloadData = JSON.parse(payloadString);
      setUser({
        id: payloadData.id,
        firstName: payloadData.first_name,
        username: payloadData.last_name,
        password: payloadData.password,
        creation_date: payloadData.creation_date
      });
      // console.log(user)
    }
  }, [document.cookie]);

  let id = 1
  return (
    <UserContext.Provider value={[user, setUser]}>
      <MenuStateContext.Provider value={[menuState, setMenuState]}>
        <Router>
          <div className="App">
            <Box sx={{ display: 'flex' }}>
              <Menu />
              <Box sx={{
                flexGrow: 2, p: 3, display: 'flex', flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}>

                <ThemeProvider theme={theme}>
                  <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/user/:id/posts" element={<UserPosts />} />
                    <Route path="/createpost" element={<CreatePost />} />
                    <Route path="/post/:id" element={<ViewEditPost />} />
                  </Routes>
                </ThemeProvider>
              </Box>
            </Box>
          </div>
        </Router>
      </MenuStateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
