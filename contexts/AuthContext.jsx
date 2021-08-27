import React, { useContext, useState } from 'react';

import UserService from '../services/UserService';

import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const userService = new UserService();

    const [currentUser, setCurrentUser] = useState();

    function signup(formData, success, error){
        userService.SignUp(formData, (response) => {
            setCurrentUser(response);
            //console.log(response);
            success();
        }, (err) => {
            error(err);
        })
    }
    function login(formData, success, error){
        userService.LogIn(formData, (response) => {
            setCurrentUser(response);
            success();
        }, (err) => {
            error(err);
        })
    }
    function logout(success, error){
        userService.LogOut( () => {
            success();
        }, (err) => {
            error(err);
        })
    }

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
