import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "../components/api";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);

}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data)


            } catch (error) {
                console.error('Error fetching user:', error);

            }
            
        };
        fetchUser();
    }, [])
    return (
        <AuthContext.Provider value={{ user ,setUser}}>
            {children}
        </AuthContext.Provider>
    )
    
}