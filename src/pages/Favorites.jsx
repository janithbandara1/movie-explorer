import { Container, Grid, Typography, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="50vh"
        >
          <Typography variant="h5" color="text.secondary">
            No favorite movies yet. Start adding some!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
