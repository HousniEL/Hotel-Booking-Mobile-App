import React, { useState, useContext } from "react";

const Context = React.createContext();

export function useSort(){
    return useContext(Context);
}

export function SortProvider({ children }){

    const [sort, setSort] = useState("Default sorting");

    const [visibleList, setVisibleList] = useState(false);

    const toggleOverlay = () => {
        setVisibleList(!visibleList);
    }; 

    function updateSort(selected = null){
        if(!selected){
            setSort();
        } else {
            setSort(selected);
        }
    }

    const value = {
        sort,
        visibleList,
        toggleOverlay,
        updateSort
    }

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    )
}