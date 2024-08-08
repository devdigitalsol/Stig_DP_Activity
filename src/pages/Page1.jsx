import IMAGE1 from "../images/page1.png"
import { useNavigate } from "react-router-dom";

export default function Page1(){

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/description"); 
  };


  return(
      // <div className="relative">
      <div className="page1">
      <img src={IMAGE1} alt="" className="w-full h-auto" />
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