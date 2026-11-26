/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user , SetUser]  = useState(() => {
        const savedUser = localStorage.getItem('current_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if(user) {
            localStorage.setItem('current_user' , JSON.stringify(user));
        } else{
            localStorage.removeItem("current_user");
        }
    } , [user]);

    const logIn = (userData) => {
        SetUser(userData);
        toast.success(`Welcome back, ${userData.name || userData.username}! 👋`);
    }

    const logOut = () => {
        SetUser(null);
        localStorage.removeItem('current_user');
        toast.success("Logged out successfully 🔒");
    }


    return(
    <AuthContext.Provider value={{ user , logIn , logOut , isAuthenticated: !!user}}>
        {children}
    </AuthContext.Provider>
    )
}