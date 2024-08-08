import { Outlet } from "react-router-dom";
import "../../utils/app.css";
import BOTTOMLOGO from "../../images/Bottom_Logo.png"

export default function Layout3(){
     return(
        <div className="max-w-md  mx-auto min-h-full layout3  flex flex-col items-center  justify-around">
          <Outlet />
        <div className="mx-auto w-full">
          <img src={BOTTOMLOGO} alt="logo" className="w-[100%]" />
        </div> 
      </div>
     )
}