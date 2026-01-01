import { useContext, useEffect, useRef, useState } from "react";
import { GetMovieBYId } from "../../API-Calls/MoviesCalls";
import Navbar from "../Navbar";

function Favourites() {

  const [moviesArray, setMoviesArray] = useState([]);
  const [movieids, setMoviesId] = useState(() => { return JSON.parse(localStorage.getItem("Favourites")) || []; });
  const isFirst = useRef(true);


  function modifyIds(ide) {
    setMoviesId(prev => prev.filter(id => id !== ide));
    setMoviesArray(prev => prev.filter(movie => movie.id !== ide));
  }



  useEffect(() => {

    async function MoviesFetch() {
      if (movieids.length > 0) {
        const movies = await Promise.all(movieids.map(id => GetMovieBYId(id)));
        setMoviesArray(movies);
      }
    }
    MoviesFetch();
    // localids.forEach(id => MovieFetch(id));
  }, [])

  
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem("Favourites", JSON.stringify(movieids));
  }, [movieids])




  return (
    <section className="h-[100vh]">
      <Navbar />
      <section className="flex-1 overflow-scroll border-box w-[100vw] px-[5vw] mt-[1rem]">
        <section className="flex flex-wrap gap-[0.8rem] justify-center">
          {moviesArray.length !== 0 &&
            moviesArray.map(movie => {
              return <section className="w-[12rem] relative" >

                <section >
                  <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="img" className="w-[12rem] h-[18rem] rounded" />
                  <span className="absolute top-3 right-4 bg-yellow-500 " onClick={() => { modifyIds(movie.id) }}><i class="fa-regular fa-star"></i></span>

                </section>
                <p className="font-bold break-words">{movie.title}</p>
                <section className="flex flex-wrap">
                  {movie.genres.map((ele, id) => {
                    return <>
                      <span className="underline">{ele.name}</span>
                      <span>{id != movie.genres.length - 1 ? ',' : ''}</span>
                    </>
                  })}
                </section>
              </section>
            })}
        </section>
      </section>
    </section>)
}

export default Favourites;