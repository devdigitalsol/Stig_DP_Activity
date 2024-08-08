import IMAGE3 from "../images/page3.png"
import { useNavigate } from "react-router-dom";

export default function Page3(){

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/description"); 
  };


  return(
   <div className="page3">
   <img src={IMAGE3} alt="" className="w-full h-auto" />
   <button
       className="btn_next bg-[#005ca6] text-white px-10 py-2 rounded"
       onClick={handleNext}
   >
     Next
   </button>
 </div>
  )
}
