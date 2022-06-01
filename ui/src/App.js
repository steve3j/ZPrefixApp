import './App.css';
import Menu from "./components/Menu"
import Box from '@mui/material/Box'
import Posts from './components/Posts'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  let id = 1
  return (
    <Router>
      <div className="App">
        <Box sx={{ display: 'flex ' }}>
          <Menu />

          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/Posts/:id" element={<Posts />} />
            </Routes>
          </Box>
        </Box>




      </div>
    </Router>
  );
}

export default App;
