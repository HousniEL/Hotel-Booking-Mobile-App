import React, { useState, useEffect } from 'react';

import {
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../../Global';

import { useFilter } from '../contexts/FilterContext';

const filters = [
    { select : "Free of charge cancellation", selected: false},
    { select : "Pay at the institution", selected: false},
    { select : "Free breakfast", selected: false},
    { select : "Free Wi-Fi", selected: false},
    { select : "Parking", selected: false},
    { select : "Air conditioning", selected: false},
    { select : "Bathroom with bathtub", selected: false},
    { select : "Hotel by the sea", selected: false},
    { select : "Spa", selected: false},
    { select : "Handicapped access", selected: false},
    { select : "Swimming pool", selected: false},
    { select : "Pets allowed", selected: false},
    { select : "Restaurant", selected: false},
    { select : "Gym", selected: false},
    { select : "Bar", selected: false}
]

export default function Suggested() {

    const { appliedFilter, AddFilter, DeleteFilter } = useFilter();

    const [filtersSuggested, setFiltersSuggested] = useState(filters);

    useEffect(() => {
        const ff = function(){
            if( appliedFilter['suggested'] ) {
                var filtersCopy = filters;
                var choosed = appliedFilter['suggested'].value;
                for(let i = 0; i < choosed.length; i++){
                    for(let j = 0; j < filtersCopy.length; j++){
                        if(filtersCopy[j].select === choosed[i]){
                            filtersCopy[j].selected = true;
                            break;
                        }
                    }
                }
            }
        };

        ff();
    }, []);

    useEffect( () => {
        setFilter();
    }, [filtersSuggested] );

    function setFilter(){
        var suggestedSet = [];
        for(let value of filtersSuggested){
            if( value.selected ) suggestedSet.push(value.select);
        }
        ( suggestedSet.length != 0 ) ? AddFilter('suggested', { value: suggestedSet }) : DeleteFilter('suggested');
    }

    function toggleOptions(value){
        var newfiltersSuggested = filtersSuggested.map( val => {
            if(value.select === val.select){
                var variable = val;
                variable.selected = !variable.selected;
                return variable; 
            }
            return val;
        } )
        setFiltersSuggested(newfiltersSuggested);
    }

    return (
        <>
        {
            filtersSuggested.map( (value, idx) => (
                <TouchableHighlight
                    underlayColor={'#CCC'}
                    activeOpacity={0.9}
                    key={idx.toString()}
                    style={ (value.selected === true) ? styles.activefilter : styles.inactivefilter}
                    onPress={() => toggleOptions(value)}
                >
                    <>
                        <MaterialCommunityIcons 
                            name={ (value.selected === true) ? 'close' : 'plus' } 
                            color={ (value.selected === true) ? 'white' : '#666'} 
                            size={16}  />
                        <Text
                            style={[{marginHorizontal: 3}, (value.selected === true) ? {color: 'white'} : {color: 'black'} ]}
                        >
                            { value.select }</Text>
                    </>
                </TouchableHighlight>
            ) )
        }
        </>
    )
}


const styles = StyleSheet.create({
    activefilter: {
        alignSelf: 'flex-start',
        backgroundColor: Global.tabactive,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
        margin: 5,
    },
    inactivefilter: {
        alignSelf: 'flex-start',
        backgroundColor: '#CCC',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
        margin: 5,
    }
});