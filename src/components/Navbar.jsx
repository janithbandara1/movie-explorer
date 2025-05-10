import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useMovieContext();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Movie Explorer
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={toggleDarkMode}
          sx={{ mr: 2 }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Button
          color="inherit"
          onClick={() => navigate('/favorites')}
          sx={{ mr: 2 }}
        >
          Favorites
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
