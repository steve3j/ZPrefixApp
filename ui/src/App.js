import './App.css';
import Menu from "./components/Menu"
import Box from '@mui/material/Box'

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex ' }}>
        <Menu />

        <Box sx={{ flexGrow: 1, p: 3 }}>
          post1

          post 2
        </Box>
      </Box>



    </div>
  );
}

export default App;
