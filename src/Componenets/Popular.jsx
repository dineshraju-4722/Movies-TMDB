import { useContext, useEffect, useState } from "react";
import { GetPopularMovies } from "../API-Calls/MoviesCalls";
import { GenreContext } from "../GenreContext";

function Popular() {
    const [PopularMovies, setPopularMovies] = useState({});
    const [page, setPage] = useState(1);
    const genreMap = useContext(GenreContext);

    useEffect(() => {
        async function abc() {
            const res = await GetPopularMovies(page);
            setPopularMovies(res);
        }
        abc();
    }, [page])

    return (
        <>
        <section className="flex flex-wrap gap-[0.8rem] justify-center">
            {PopularMovies.results !== undefined &&
                PopularMovies.results.map(movie => {
                    return <section className="w-[12rem]">
                        <section >
                            <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="img" className="w-[12rem] h-[18rem] rounded" />
                        </section>
                        <p className="font-bold break-words">{movie.title}</p>
                        <section className="flex flex-wrap">
                                {movie.genre_ids.map((ele, id) => {
                                    return <>
                                        <span className="underline">{genreMap[ele]}</span>
                                        <span>{id != movie.genre_ids.length-1 ? ',' : ''}</span>
                                    </>
                                })}
                            </section>
                    </section>
                })}

            
        </section>
        <section className="flex gap-[2rem] justify-center my-[1rem]">
                {<span onClick={() => { page > 1 && setPage(page - 1) }}>-</span>}
                {page}
                <span onClick={() => setPage(page + 1)}>+</span>
            </section>
        </>
    )
}

export default Popular;