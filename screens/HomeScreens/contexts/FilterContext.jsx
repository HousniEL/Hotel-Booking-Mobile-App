import React, { useState, useContext } from 'react';

const Context = React.createContext();

export function useFilter(){
    return useContext(Context);
}

export function FilterProvider({ children }){

    const [filter, setFilter] = useState({});
    const [appliedFilter, setAppliedFilter] = useState({});

    function AddFilter(type, object){
        var filterCopy = filter;
        if(!filterCopy[type]){
            filterCopy[type] = object;
            setFilter(filterCopy);
        } else {
            UpdateFilter(type, object);
        }
    }

    function DeleteFilter(type){
        if(filter.size !== 0){
            var filterCopy = filter;
            delete filterCopy[type];
            setFilter(filterCopy);
        }
    }

    function UpdateFilter(type, newValue){
        if(filter.size !== 0){
            var filterCopy = filter;
            delete filterCopy[type];
            filterCopy[type] = newValue;
            setFilter(filterCopy);
        }
    }

    function unsetPrice(){
        if(filter.size !== 0){
            var filterCopy = filter;
            if( !filterCopy['price'] ){
                var priceCopy = filterCopy['price'];
                delete filterCopy['price'];
                delete priceCopy.value['max'];
                if( JSON.stringify(priceCopy.value) !== "{}") filterCopy['price'] = priceCopy;
                setFilter(filterCopy);
            }
        }
    }


    function ApplyIt(){
        setAppliedFilter({});
        setAppliedFilter(filter);
    }

    function getAppliedFilter(){
        return appliedFilter;
    }

    var value = {
        filter,
        appliedFilter,
        AddFilter,
        DeleteFilter,
        unsetPrice,
        ApplyIt,
        getAppliedFilter
    }

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    )
}