import { createContext, useState } from "react";


const UserProgressContext=createContext({
    progress: ''   , // cart, checkout
    showCart:()=>{},
    hideCart:()=>{},
    hideCheckOut:()=>{},
    showCheckOut:()=>{}
})


export function UserProgressContextProvider({children}){
    const [userProgress,setUserProgress]=useState('');

    // updating the states
    const showCart=()=>{ setUserProgress('cart')};
    const hideCart=()=>{setUserProgress('')};
    const showCheckOut=()=>{setUserProgress('checkout')};
    const hideCheckOut=()=>{setUserProgress('')};

    const userProgressContext={
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut
    }
    return <UserProgressContext.Provider value={userProgressContext} >
        {children}
    </UserProgressContext.Provider>
}

export default UserProgressContext;