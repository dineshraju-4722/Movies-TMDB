import { useContext, useEffect, useRef, useState } from "react";
import { GetSearchResults } from "../../API-Calls/MoviesCalls";
import { GenreContext } from "../../GenreContext";

function SearchPage() {

    const [moviesData, setMoviesData] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const genreMap = useContext(GenreContext);

    const lastMovieRef = useRef(null);
    const observer = useRef(null);



    function Searching(e) {
        const value = e.target.value;
        setSearch(value);
        setTimeout(async () => {
            const res = await GetSearchResults(search, 1);
            setPage(1);
            setMoviesData(res);
        }, 2000)
    }

    async function loadmore() {
        const res = await GetSearchResults(search, page);
        setMoviesData(prev => [...prev, ...res]);
    }


    const [localids, setLocalids] = useState(() => {
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
        if (!search) return;
        loadmore();
    }, [page])
    useEffect(() => {

        if (!lastMovieRef.current) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        })

        observer.current.observe(lastMovieRef.current);
        return () => observer.current?.disconnect();

    }, [moviesData])

    // useEffect(() => { loadmore(); }, [page])



    return (
        <section className="flex flex-col items-center h-[100vh]">
            <input type="search" className="border border-gray-500 h-[2.3rem] p-[0.2rem] w-[60vw] mt-[2rem] outline-none" placeholder="Search for Movies" value={search} onChange={(e) => Searching(e)} />
            <section className="flex-1 overflow-scroll border-box w-[100vw] px-[5vw] mt-[1rem]">
                <section className="flex flex-wrap gap-[0.8rem] justify-center">
                    {moviesData.length !== 0 &&
                        moviesData.map((movie, idx) => {
                            if (idx == moviesData.length - 1) {
                                return <section className="w-[12rem] relative" ref={lastMovieRef}>
                                    <section >
                                        <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="img" className="w-[12rem] h-[18rem] rounded" />

                                    </section>
                                    <p className="font-bold break-words">{movie.title}</p>
                                    <section className="flex flex-wrap">
                                        {movie.genre_ids != undefined && movie.genre_ids.map((ele, id) => {
                                            return <>
                                                <span className="underline">{genreMap[ele]}</span>
                                                <span>{id != movie.genre_ids.length - 1 ? ',' : ''}</span>
                                            </>
                                        })}
                                    </section>
                                </section>
                            }
                            return <section className="w-[12rem] relative" >
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
                                    {movie.genre_ids != undefined && movie.genre_ids.map((ele, id) => {
                                        return <>
                                            <span className="underline">{genreMap[ele]}</span>
                                            <span>{id != movie.genre_ids.length - 1 ? ',' : ''}</span>
                                        </>
                                    })}
                                </section>
                            </section>
                        })}
                </section>
            </section>
        </section>
    )
}

export default SearchPage;