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

// 🔥 Firebase
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  /* ================== AUTH STATE ================== */
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

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

  /* ================== PROTECTED ROUTE ================== */
  const Protected = ({ children }) => {
    if (authLoading) return <h2>Loading...</h2>;
    return user ? children : <Navigate to="/auth" replace />;
  };

  /* ================== AUTH PAGE ================== */
  const AuthPage = () => (
    <div
      className="auth-page"
      style={{
        padding: "40px",
        position: "relative",
        zIndex: 9999,
      }}
    >
      <h2>Firebase Auth</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ pointerEvents: "auto" }}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ pointerEvents: "auto" }}
      />

      <br />
      <br />

      <button onClick={login} style={{ pointerEvents: "auto" }}>
        Login
      </button>

      <button
        onClick={signup}
        style={{ marginLeft: "10px", pointerEvents: "auto" }}
      >
        Signup
      </button>
    </div>
  );

  /* ================== UI ================== */
  return (
    <GenreContext.Provider value={{ genreMap, loading, setLoading }}>
      <Router>
        {user && (
          <div
            style={{
              padding: "10px",
              background: "#222",
              color: "#fff",
              position: "relative",
              zIndex: 9999,
            }}
          >
            Logged in as: {user.email}
            <button
              onClick={logout}
              style={{ marginLeft: "15px", pointerEvents: "auto" }}
            >
              Logout
            </button>
          </div>
        )}

        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />

          <Route
            path="/favourites"
            element={
              <Protected>
                <Favourites />
              </Protected>
            }
          />

          <Route
            path="/search"
            element={
              <Protected>
                <SearchPage />
              </Protected>
            }
          />

          <Route
            path="*"
            element={<Navigate to={user ? "/home" : "/auth"} />}
          />
        </Routes>
      </Router>
    </GenreContext.Provider>
  );
}

export default App;
