import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Componenets/Pages/HomePage";
import Favourites from "./Componenets/Pages/FavouritesPage";
import SearchPage from "./Componenets/Pages/SearchPage";
import { GenreContext } from "./GenreContext";



function App() {

  

  /* ================== GENRE LOGIC ================== */
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const genreMap = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  const [loading, setLoading] = useState(false);

  
  return (
    <GenreContext.Provider value={{ genreMap, loading, setLoading }}>
      <Router>

        <Routes>
         

          <Route
            path="/home"
            element={
                <Home />
            }
          />

          <Route
            path="/favourites"
            element={
                <Favourites />
            }
          />

          <Route
            path="/search"
            element={
                <SearchPage />
            }
          />

          
        </Routes>
      </Router>
    </GenreContext.Provider>
  );
}

export default App;
