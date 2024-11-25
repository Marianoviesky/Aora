import { createContext,useEffect,useContext,useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = ()=>useContext(GlobalContext);






const GlobalProvider = ({ children})=>{

    const [isloggedIn, setIsloggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getCurrentUser()
            .then((res)=>{
               if(res){
                setIsloggedIn(true);
                setUser(res)
               }else{
                setIsloggedIn(false)
                setUser(null)
               }
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(()=>{
                setIsLoading(false)
                })
    },[])
    return(
        <GlobalContext.Provider
        value={{
            isloggedIn,
            setIsloggedIn,
            user,
            setUser,
            isLoading,
            setIsLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;