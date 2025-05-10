import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { searchMovies, getTrendingMovies } from '../services/movieApi';
import { useMovieContext } from '../contexts/MovieContext';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movies, setMovies, lastSearch } = useMovieContext();
  const [page, setPage] = useState(1);

  const fetchMovies = async (searchTerm = '', pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = searchTerm
        ? await searchMovies(searchTerm, pageNum)
        : await getTrendingMovies();
      
      setMovies(pageNum === 1 ? data.results : [...movies, ...data.results]);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastSearch) {
      fetchMovies(lastSearch);
    } else {
      fetchMovies();
    }
  }, []);

  const handleSearch = (searchTerm) => {
    fetchMovies(searchTerm);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Home;
