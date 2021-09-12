import React, { useContext, useState } from 'react';

const Context = React.createContext();

export function useBookingInfo(){
    return useContext(Context);
}

export function BookingProvider({ children }){

    const [bookInfo, setBookInfo] = useState();

    function Book(object){
        setBookInfo(object);
    }

    const value = {
        bookInfo,
        Book
    };

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    )
}