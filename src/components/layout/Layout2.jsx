import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { AppContext } from "../../context";


export default function Layout2() {
  const { pathname } = useLocation();

  return (
    <div
      className={`max-w-md mx-auto min-h-full flex flex-col items-center justify-center  ${
        pathname === "/selectcolor" ? "sliderBg" : "grayBg"
      }`}
    >
      <div className="w-full h-full grow flex flex-col items-center justify-between pt-4">
        <Outlet />
      </div>
      {/* <div className="w-full shrink-0 overflow-hidden">
        <div className="layout2 -mt-10">
          <img src={BOTTOMLOGO} alt="logo" />
          <p className="text-center  text-small text-white font-extralight  ">
            JB00326BS
          </p>
        </div>
      </div> */}
    </div>
  );
}
