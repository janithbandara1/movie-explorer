import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import { MovieProvider } from './contexts/MovieContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import { useMovieContext } from './contexts/MovieContext';

const AppContent = () => {
  const { darkMode } = useMovieContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default' 
        }}
      >
        <Router>
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Container>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
};

export default App;
