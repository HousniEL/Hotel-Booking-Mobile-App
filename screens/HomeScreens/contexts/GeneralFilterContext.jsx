import React, { useState, useContext } from "react";

const Context = React.createContext();

export function useGeneral(){
    return useContext(Context);
} 

export function GeneralFilterProvider({ children }){

    const defaultValue = {
        search: {},
        rooms: {},
        filter: {},
        sortby: {},
    }

    const [generalFilter, setGeneralFilter] = useState(defaultValue);

    function setNewValue(type, value){
        var generalFilterCopy = generalFilter;
        //generalFilterCopy.delete(type);
        generalFilterCopy[type] = value;
        setGeneralFilter(generalFilterCopy);
    }

    const value = {
        generalFilter,
        setNewValue
    }

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    )
}