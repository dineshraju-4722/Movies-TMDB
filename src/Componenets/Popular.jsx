import { useContext, useEffect, useRef, useState } from "react";
import { GetPopularMovies } from "../API-Calls/MoviesCalls";
import { GenreContext } from "../GenreContext";

function Popular() {
    // const isFirst = useRef(true);
    const [PopularMovies, setPopularMovies] = useState({});
    const [page, setPage] = useState(1);
    const {genreMap,loading,setLoading} = useContext(GenreContext); 
    const [localids, setLocalids] = useState(()=>{
        return JSON.parse(localStorage.getItem("Favourites")) || [];
    });

    function modifyIds(id) {
        if (localids.indexOf(id) === -1) {
            setLocalids(prev => [...prev, id]);
        } else {
            setLocalids(prev => prev.filter(e => e != id));
        }
    }
    useEffect(() => {
        localStorage.setItem("Favourites", JSON.stringify(localids));
    }, [localids])
    

    useEffect(() => {
        async function abc() {
            setLoading(true)
            const res = await GetPopularMovies(page);
            setLoading(false)
            setPopularMovies(res);
        }
        abc();
    }, [page])

    return (
        <>
            <section className="flex flex-wrap gap-[0.8rem] justify-center p-[2vw]">
                {PopularMovies.results !== undefined &&
                    PopularMovies.results.map(movie => {
                        return <section className="w-[12rem] relative">
                            <section >
                                <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="img" className="w-[12rem] h-[18rem] rounded" />
                                <span className="absolute top-3 right-4 bg-yellow-500 " onClick={() => { modifyIds(movie.id) }}>{
                                    localids.indexOf(movie.id) === -1 ?
                                        <i className="fa-solid fa-star"></i>
                                        :
                                        <i className="fa-regular fa-star"></i>
                                }</span>
                            </section>
                            <p className="font-bold break-words">{movie.title}</p>
                            <section className="flex flex-wrap">
                                {movie.genre_ids.map((ele, id) => {
                                    return <>
                                        <span className="underline">{genreMap[ele]}</span>
                                        <span>{id != movie.genre_ids.length - 1 ? ',' : ''}</span>
                                    </>
                                })}
                            </section>
                        </section>
                    })}


            </section>
            <section className="flex gap-[2rem] justify-center my-[1rem]">
                   <i class="fa-solid fa-arrow-left" onClick={() => { page > 1 && setPage(page - 1) }}></i>
                {page}
                <i class="fa-solid fa-arrow-right" onClick={() => setPage(page + 1)}></i>
            </section>
        </>
    )
}

export default Popular;