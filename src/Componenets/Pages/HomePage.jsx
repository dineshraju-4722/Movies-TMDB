import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import TopRated from "../TopRated";
import Popular from "../Popular";
import Upcoming from "../Upcoming";

function Home() {

    const [activeTab, setActiveTab] = useState("upcoming");
    
    


    return (
        <section className="h-screen flex flex-col">
            <Navbar />
            <section className="border-box px-[5vw] flex gap-[0.5rem]">
                <button className={` rounded-sm cursor-pointer ${activeTab === 'trending' ? 'bg-yellow-500' : ''}`} onClick={() => setActiveTab("trending")}>Trending</button>
                <button className={` rounded-sm cursor-pointer ${activeTab === 'popular' ? 'bg-yellow-500' : ''}`} onClick={() => setActiveTab("popular")}>Popular</button>
                <button className={` rounded-sm cursor-pointer ${activeTab === 'upcoming' ? 'bg-yellow-500' : ''}`} onClick={() => setActiveTab("upcoming")}>Upcoming</button>

            </section>

            <section className="flex-1 overflow-scroll border-box w-[100vw] px-[5vw] mt-[1rem]">
                {activeTab === "trending" && <TopRated />}
                {activeTab === "popular" && <Popular />}
                {activeTab === "upcoming" && <Upcoming />}

            </section>
        </section>
    )
}
export default Home;