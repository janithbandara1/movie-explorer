import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTdiZjM3M2M2NjdiYjk4YTkzY2M3ZDA1YmU3YzBmOCIsIm5iZiI6MTc0Njc2ODU5Ni42ODgsInN1YiI6IjY4MWQ5MmQ0YTZiODZmZjkzMmMxZGZiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._iQp6fTHlHW2OsVXdo6vFmDcWRBUd0oEvhbzv52LSL0'; // Replace with your actual API key

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const [details, videos] = await Promise.all([
      api.get(`/movie/${movieId}`),
      api.get(`/movie/${movieId}/videos`)
    ]);
    
    return {
      ...details.data,
      videos: videos.data.results
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};
