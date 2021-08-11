import React, { useContext, useState, useEffect } from 'react';

const Context = React.createContext();

export function useRooms(){
    return useContext(Context);
}

export function RoomsProvider({ children }) {

    const byDefault = [
        {
            adults: 2,
            childrens: 0
        }
    ]

    const [rooms, setRooms] = useState(byDefault);


    function modifieRoom(roomNumber, newNumAdults = null, newNumChilds = null){
        if(newNumAdults){
            var roomsCopy = rooms;
            roomsCopy[roomNumber - 1].adults = newNumAdults;
            setRooms(roomsCopy);
        }
        if(newNumChilds){
            var roomsCopy = rooms;
            roomsCopy[roomNumber - 1].childrens = newNumChilds;
            setRooms(roomsCopy);
        }
    }



    function deleteRoom(){
        let roomCopy = rooms;
        roomCopy.pop();
        setRooms(roomCopy);
    }

    function addRoom(){
        let roomCopy = rooms;
        roomCopy.push({
            adults: 2,
            childrens: 0
        })
        setRooms(roomCopy);
    }


    const value = {
        rooms,
        addRoom,
        deleteRoom,
        modifieRoom
    }

    return (
        <Context.Provider value={value} >
            { children }
        </Context.Provider>
    )
}
