import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    function login(email, password){
        setCurrentUser({email, password});
    }

    const value = {
        currentUser,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
