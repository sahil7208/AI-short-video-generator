"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext } from './context/AuthContext'
import { auth } from '@/configs/firebaseConfig'
 import { api } from '@/convex/_generated/api'
import { ConvexProvider, ConvexReactClient,useMutation } from "convex/react";

export const Provider = ({children}) => {
    const [user,setUser] = useState();
    const CreateUser = useMutation(api.users.CreateNewUser);
    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,async(user) => {
            console.log("user at provider: ",user)
           // setUser(user)
            const result = await CreateUser({
                name:user?.displayName,
                email:user?.email,
                pictureURL:user?.photoURL
            })
            console.log("result at provider: ",result)
            setUser(result)
        })
        return () => unSubscribe();
    },[])

  return (
    <div>
        
        <AuthContext.Provider value={{user}}>
        <NextThemesProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
        >
        {children}
        </NextThemesProvider>
        </AuthContext.Provider>
       
    </div>
  )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}
