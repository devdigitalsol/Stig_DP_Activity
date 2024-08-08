import IMAGE2 from "../images/page2.png"
import { useNavigate } from "react-router-dom"

export default function Page2(){

   const navigate= useNavigate();

   const handleNext = () => {
    navigate("/description"); 
  };

    return(
       <div className="page2">
       <img src={IMAGE2} alt="" className="w-full h-auto" />
       <button
           className="btn_next bg-[#005ca6] text-white px-10 py-2 rounded"
           onClick={handleNext}
       >
         Next
       </button>
     </div>
    )
}
 

