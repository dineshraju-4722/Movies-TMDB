import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import TopRated from "../TopRated";
import Popular from "../Popular";
import Upcoming from "../Upcoming";
import { GenreContext } from "../../GenreContext";


function Home() {
    const {loading , setLoading}=useContext(GenreContext);

    const [activeTab, setActiveTab] = useState("trending");
    
    


    return (
        <section className="h-screen flex flex-col">
            <Navbar />
            <section className="border-box px-[5vw] flex gap-[0.5rem] bg-gray-100">
                <button className={`p-[0.1rem] rounded-sm cursor-pointer ${activeTab === 'trending' ? 'underline font-bold' : ''}`} onClick={() => setActiveTab("trending")}>Trending</button>
                <button className={`p-[0.1rem] rounded-sm cursor-pointer ${activeTab === 'popular' ? 'underline font-bold' : ''}`} onClick={() => setActiveTab("popular")}>Popular</button>
                <button className={`p-[0.1rem] rounded-sm cursor-pointer ${activeTab === 'upcoming' ? 'underline font-bold' : ''}`} onClick={() => setActiveTab("upcoming")}>Upcoming</button>

            </section>

            <section className="flex flex-col flex-1 overflow-y-scroll border-box w-[100vw]  mt-[1rem] ">
                {loading && <p className="w-[100%] h-[100%]  absolute bg-black opacity-50 z-50"></p>}

                {activeTab === "trending" && <TopRated />}
                {activeTab === "popular" && <Popular />}
                {activeTab === "upcoming" && <Upcoming />}

            </section>
        </section>
    )
}
export default Home;