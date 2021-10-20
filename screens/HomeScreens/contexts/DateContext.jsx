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

    function getDateString(timestamp){
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        let dateString = `${year}-`;
        if( month < 10 ){
            dateString += `0${month}-`;
        } else {
            dateString += `${month}-`;
        }

        if( day < 10 ){
            dateString += `0${day}`;
        } else {
            dateString += `${day}`;
        }

        return dateString;
    }

    const today = new Date();
    const firststart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
    const firstend = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);


    const defaultStart = {
        day: { 
            day: firststart.getDate(),
            month: firststart.getMonth() + 1,
            year: firststart.getFullYear(),
            timestamp : firststart.getTime() 
        },
        dayFormat:  getDayWellFormat({
            day: firststart.getDate(),
            month: firststart.getMonth() + 1,
            year: firststart.getFullYear()
        })
    }
    const defaultEnd = {
        day: { 
            day: firstend.getDate(),
            month: firstend.getMonth() + 1,
            year: firstend.getFullYear(),
            timestamp : firstend.getTime() 
        },
        dayFormat:  getDayWellFormat({
            day: firstend.getDate(),
            month: firstend.getMonth() + 1,
            year: firstend.getFullYear()
        })  
    }

    const [ appliedStartDay, setAppliedStartDay ] = useState(defaultStart);
    const [ appliedEndDay, setAppliedEndDay ] = useState(defaultEnd);

    const [ startDay, setStartDay ] = useState(defaultStart);
    const [ endDay, setEndDay ] = useState(defaultEnd);
    
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