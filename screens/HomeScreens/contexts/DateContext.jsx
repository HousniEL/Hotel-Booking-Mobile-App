import React, { useState, useContext } from 'react';

const Context = React.createContext();

export function useDate(){
    return useContext(Context);
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

export function DateProvider({ children }){

    const [ appliedStartDay, setAppliedStartDay ] = useState({});
    const [ appliedEndDay, setAppliedEndDay ] = useState({});

    const [ startDay, setStartDay ] = useState({});
    const [ endDay, setEndDay ] = useState({});
    
    const [ startAgain, setStartAgain ] = useState(true);

    function getDayWellFormat(dayObj){
        const day = dayObj.day;
        const month = months[Number(dayObj.month) - 1];
        const year = dayObj.year;
        return `${day} ${month} ${year}`;
    }

    function setCurrentPeriod(start = null, end = null){
        if(start){
            const newStartDay = {
                day: start,
                dayFormat: getDayWellFormat(start)
            };
            setStartDay(newStartDay);
            if(startAgain) setEndDay({}) 
        }
        if(end){
            const newEndDay = {
                day: end,
                dayFormat: getDayWellFormat(end)
            };
            setEndDay(newEndDay);
        }
    }

    function resetPeriod(){
        setStartDay(appliedStartDay);
        setEndDay(appliedEndDay);
    }

    function applyPeriod(){
        setAppliedStartDay(startDay);
        setAppliedEndDay(endDay);
    }


    const value = {
        startDay,
        endDay,
        appliedStartDay,
        appliedEndDay,
        startAgain,
        setCurrentPeriod,
        applyPeriod,
        setStartAgain,
        resetPeriod
    }

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    ) 

}