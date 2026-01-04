import {  useNavigate } from "react-router-dom";
import { requestNotificationPermission } from "../notifications";

function Navbar(){

     const navigate=useNavigate();

    return (
        <section>
            <section className="w-[100vw] h-[3.5rem] bg-red-500 border-box px-[5vw]">f</section>
            <section className="flex gap-[0.9rem] w-[100vw] bg-yellow-500 border-box p-[0.3rem] px-[5vw]">
                <span className="font-bold text-xl" onClick={()=>{navigate(`/home`)}}>Movies</span>
                <span className="font-bold text-xl" onClick={()=>{navigate(`/favourites`)}}>Favourites</span>
                <button onClick={requestNotificationPermission}>
  Enable Notifications
</button>
            </section>
        </section>
    )
}

export default Navbar;