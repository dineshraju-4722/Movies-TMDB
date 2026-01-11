import { useRef, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";

function Navbar(){

     const navigate=useNavigate();
     const location = useLocation();
    //  const[home,setHome]=useRef(true)
    
    
    const home = location.pathname === "/home";
    const favourites = location.pathname === "/favourites";
    return (
        <section>
            <section className="w-[100vw] h-[3.5rem] bg-gray-400 border-box px-[5vw] flex justify-center items-center">
                <span className="border w-[50vw] px-[2vw] py-[0.1rem] rounded-sm"  onClick={()=>{navigate('/search')}}>search for movies</span>
            </section>
            <section className="flex gap-[0.9rem] w-[100vw] bg-gray-200 border-box p-[0.3rem] px-[5vw]">
                <span className={`font-bold text-xl p-[0.1rem] rounded-sm ${home?'bg-sky-300':''} `} onClick={()=>{navigate(`/home`);}}>Movies</span>
                <span className={`font-bold text-xl p-[0.1rem] rounded-sm ${favourites?'bg-sky-300':''}`} onClick={()=>{navigate(`/favourites`)}}>Favourites</span>
            </section>
        </section>
    )
}

export default Navbar;