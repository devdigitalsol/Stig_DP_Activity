import { createContext, useState } from "react";

export const AppContext= createContext();

export const AppProvider=({children})=>{
    const [uploadedPhoto, setUploadedPhoto]=useState(null);
    const [isAuthenticated, setIsAuthenticated]=useState(false);
    const[formData, setFormData]=useState({});
    const[identifier,setIdentifier]=useState();
    const[imgUrl, setImgUrl]=useState("");
    
    return(
         <AppContext.Provider value={{uploadedPhoto, setUploadedPhoto, isAuthenticated, setIsAuthenticated, 
               formData, setFormData,identifier,setIdentifier,imgUrl,setImgUrl 
          }}>
              {children}
         </AppContext.Provider>
    )
}
