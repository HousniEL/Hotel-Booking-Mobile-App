import React, { useContext, useState } from 'react';

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

    const [appliedRooms, setAppliedRooms] = useState([
        {
            adults: 2,
            childrens: 0
        }
    ]);

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

    function resetRooms(){
        var appliedRCopy = appliedRooms;
        setRooms(appliedRCopy);
    }

    function totalPandR(){
        var numberOfRooms = appliedRooms.length;
        var numberOfPersons = 0;
        for(let room of appliedRooms){
            numberOfPersons += Number(room.adults) + Number(room.childrens);
        }
        var strNOR = ( numberOfRooms > 1 ) ? `${numberOfRooms} chambers` : `${numberOfRooms} chamber`;
        var strNOP = `${numberOfPersons} persons`;
        return strNOP + ' - ' + strNOR;
    }

    function ApplyRooms(){
        setAppliedRooms(rooms);
    }

    const value = {
        rooms,
        appliedRooms,
        addRoom,
        deleteRoom,
        modifieRoom,
        totalPandR,
        ApplyRooms,
        resetRooms
    }

    return (
        <Context.Provider value={value} >
            { children }
        </Context.Provider>
    )
}
