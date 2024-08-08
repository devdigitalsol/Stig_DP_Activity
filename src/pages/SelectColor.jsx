import { useNavigate } from "react-router-dom";
import BOX from "../images/Brown_Box.png"
import ORANGE from "../images/orange.png"
import WHITE from "../images/white.png"
import GREEN from "../images/green.png"

export default function Selectcolor(){

  const navigate = useNavigate();

    return(
      <div className="relative box1 pt-6">
      <h3 className="text-primary text-3xl  xs:text-sm font-bold text-center mb-2">
        SELECT ANY ONE OF <br /> THESE 3 COLORS
      </h3>
      <div className="relative mx-auto mb-4 w-full flex justify-center">
        <img src={BOX} alt="Box" className="" />
        <div className="absolute  top-0 left-0 w-full h-full flex flex-col justify-center items-center ">
          <img
            src={ORANGE}
            alt="Orange"
            className="h-16 cursor-pointer"
            onClick={() => navigate('/page1')}
          />
          <img
            src={WHITE}
            alt="White"
            className="h-16 cursor-pointer"
            onClick={() => navigate('/page2')}
          />
          <img
            src={GREEN}
            alt="Green"
            className="h-16 cursor-pointer"
            onClick={() => navigate('/page3')}
          />
        </div>
      </div>
    </div>
    )
 }