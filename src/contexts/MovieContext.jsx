import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [lastSearch, setLastSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load favorites and last search from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedLastSearch = localStorage.getItem('lastSearch');
    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedLastSearch) setLastSearch(storedLastSearch);
    if (storedDarkMode) setDarkMode(JSON.parse(storedDarkMode));
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isFavorite = prev.some(m => m.id === movie.id);
      if (isFavorite) {
        return prev.filter(m => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <MovieContext.Provider value={{
      movies,
      setMovies,
      favorites,
      toggleFavorite,
      lastSearch,
      setLastSearch,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </MovieContext.Provider>
  );
};
