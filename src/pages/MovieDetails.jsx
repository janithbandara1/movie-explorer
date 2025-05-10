import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Paper,
} from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { getMovieDetails } from '../services/movieApi';
import { useMovieContext } from '../contexts/MovieContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!movie) return null;

  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'placeholder-image-url';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={imageUrl}
              alt={movie.title}
              sx={{
                width: '100%',
                borderRadius: 1,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                {movie.title}
              </Typography>
              <IconButton
                onClick={() => toggleFavorite(movie)}
                color="primary"
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average.toFixed(1)}
            </Typography>

            <Box sx={{ mb: 2 }}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            {movie.videos && movie.videos.length > 0 && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Trailer
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0,
                    overflow: 'hidden',
                    '& iframe': {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    },
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                  />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MovieDetails;
