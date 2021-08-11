import React, { useState, useContext } from 'react';

const Context = React.createContext();

export function useLocation(){
    return useContext(Context);
}

export function LocationProvider({ children }) {

    const [location, setLocation] = useState();

    const [visibleList, setVisibleList] = useState(false);

    const toggleOverlay = () => {
        setVisibleList(!visibleList);
    }; 


    function updateLocation(selected = null){
        if(!selected){
            setLocation();
        } else {
            setLocation(selected);
        }
    }

    var value = {
        location,
        visibleList,
        updateLocation,
        toggleOverlay
    }

    return (
        <Context.Provider value={value} >
            { children }
        </Context.Provider>
    )
}
