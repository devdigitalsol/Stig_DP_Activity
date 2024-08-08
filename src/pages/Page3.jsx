import IMAGE3 from "../images/page3.png"
import { useNavigate } from "react-router-dom";

export default function Page3(){

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/description"); 
  };


  return(
  //   <div className="relative">
  //   <img src={IMAGE3} alt="" className="w-full h-auto relative " />
  //   <button
  //     className="absolute bottom-20 right-5  md:bottom-24 md:right-8 lg:bottom-28 lg:right-10 bg-[#005ca6] text-white px-4 py-2 rounded"
  //     onClick={handleNext}
  //   >
  //     Next
  //   </button>
  // </div>
   // <div className="relative">
   <div className="page3">
   <img src={IMAGE3} alt="" className="w-full h-auto" />
   <button
       className="btn_next bg-[#005ca6] text-white px-4 py-2 rounded"
       // className="absolute bottom-20 right-5  md:bottom-24 md:right-8 lg:bottom-28 lg:right-10 bg-[#005ca6] text-white px-4 py-2 rounded"
       onClick={handleNext}
   >
     Next
   </button>
 </div>
  )
}
