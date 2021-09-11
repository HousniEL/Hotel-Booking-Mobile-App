import React, { useContext, useState } from 'react';

import UserService from '../services/UserService';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const userService = new UserService();

    const [currentUser, setCurrentUser] = useState();

    function signup(formData, success, error){
        userService.SignUp(formData, (res) => {
            success("success");
        }, (err) => {
            if(err.errors){
                error(err.errors);
            } else {
                var { message } = err;
                error({ message });
            }
        })
    }
    function login(formData, success, error){
        userService.LogIn(formData, (res) => {
            if(res.verifie){
                success(res);
            } else {
                setCurrentUser(res);
                success(res);
            }
        }, (err) => {
            error(err);
        })
    }
    function codeverification(object, success, error){
        userService.codeVerification(object, (res) => {
            if(res.error){
                success(res);
            } else {
                setCurrentUser(res);
                success(res);
            }
        }, (err) => {
            error(err);
        })
    }
    function logout(success, error){
        userService.LogOut( () => {
            setCurrentUser();
            success();
        }, (err) => {
            error(err);
        })
    }

    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        codeverification
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
