import React, { useState, useContext } from 'react';

const Context = React.createContext();

export function useFilter(){
    return useContext(Context);
}

export function FilterProvider({ children }){

    const [filter, setFilter] = useState(new Map());
    const [appliedFilter, setAppliedFilter] = useState(new Map());

    function AddFilter(type, object){
        var filterCopy = filter;
        if(!filterCopy.get(type)){
            filterCopy.set(type, object);
            setFilter(filterCopy);
        } else {
            UpdateFilter(type, object);
        }
    }

    function DeleteFilter(type){
        if(filter.size !== 0){
            var filterCopy = filter;
            filterCopy.delete(type);
            setFilter(filterCopy);
        }
    }

    function UpdateFilter(type, newValue){
        if(filter.size !== 0){
            var filterCopy = filter;
            filterCopy.delete(type);
            filterCopy.set(type, newValue);
            setFilter(filterCopy);
        }
    }

    function unsetPrice(){
        if(filter.size !== 0){
            var filterCopy = filter;
            if( !filterCopy.get('price') ){
                var priceCopy = filterCopy.get('price');
                filterCopy.delete('price');
                delete priceCopy.value['max'];
                if( JSON.stringify(priceCopy.value) !== "{}") filterCopy.set('price', priceCopy);
                setFilter(filterCopy);
            }
        }
    }


    function ApplyIt(){
        setAppliedFilter(new Map());
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