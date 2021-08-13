import React, { useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { Input } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFilter } from '../contexts/FilterContext';

export default function Price() {

    const { AddFilter, DeleteFilter, unsetPrice, appliedFilter } = useFilter();

    var defaultValue=[10, 500];

    const [priceRange, setPriceRange] = React.useState(defaultValue);

    const [minInput, setMinInput] = React.useState(priceRange[0].toString());
    const [maxInput, setMaxInput] = React.useState(priceRange[1].toString());

    useEffect(() => {
        const ff = function(){
            if( appliedFilter.get('price') ){
                var minmax = appliedFilter.get('price').value;
                var min = (minmax.min) ? minmax.min : 10;
                var max = (minmax.max) ? minmax.max : 500;
                setMinInput(min.toString());
                setMaxInput(max.toString());
                setPriceRange([min, max]);
            }
            appliedFilter.delete('price');
        };

        ff();
    }, [])

    useEffect(() => {
        if(Number(minInput) < Number(maxInput)){
            setFilter(Number(minInput), Number(maxInput));
        }
    }, [minInput, maxInput]);

    function setFilter(valueMin, valueMax){
        if( valueMin > defaultValue[0] && valueMax < defaultValue[1] ){
            var object = {
                value: { min: valueMin, max: valueMax }
            };
            AddFilter("price", object);
        } else {
            if( valueMax < defaultValue[1] ){
                setFilterMax(valueMax);
            } else if( valueMin > defaultValue[0] ) {
                setFilterMin(valueMin);
            } else {
                DeleteFilter('price');
            }
        }
    }

    function setFilterMin(value){
        if( value > defaultValue[0] ){
            var object = {
                value: { min: value }
            };
            AddFilter("price", object);
        } else {
            unsetPrice('min');
        }
    }

    function setFilterMax(value){
        if( value < defaultValue[1] ){
            var object = {
                value: { max: value }
            };
            AddFilter("price", object);
        } else {
            unsetPrice('max');
        }
    }

    var priceRangeChange = (value) => {
        setMinInput(value[0].toString());
        setMaxInput(value[1].toString());
        setPriceRange(value);
    }

    function managePrice(type, value){
        const val = Number(value);
        if ( type === 'min' ){
            ( val != 0 && val >= 10 && val <= priceRange[1] && val <= 500 ) ? (
                setPriceRange([val, priceRange[1]])
            ) : (
                setPriceRange([10, priceRange[1]]),
                setMinInput("10")
            );
        } else {
            ( val != 0 && val >= 10 && val >= priceRange[0] && val <= 500 ) ? (
                setPriceRange([priceRange[0], val])
            ) : (
                setPriceRange([priceRange[0], 500]),
                setMaxInput("500")
            );
        }
        return "50";
    }

    return (
        <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
                <Text style={{fontWeight: '700', color: '#666'}}>Min</Text>
                <Input 
                    returnKeyType='default'
                    value={minInput}
                    keyboardType={'numeric'}
                    inputContainerStyle={styles.inputContainerPrice}
                    rightIcon={
                        <MaterialCommunityIcons name='currency-eur' color={'#444'} size={14} />
                    }
                    containerStyle={{
                        height: 30,
                        paddingHorizontal: 0
                    }}
                    inputStyle={{
                        paddingLeft: 5,
                        minHeight: 0
                    }}
                    errorStyle={{display :'none'}}
                    onChangeText={value => setMinInput(value)}
                    onSubmitEditing={() => managePrice('min', minInput)}
                    onBlur={() => managePrice('min', minInput)}
                />
            </View>
            <View>
                <Text style={{fontWeight: '700', color: '#666', alignSelf: 'flex-end'}}>Max</Text>
                <Input 
                    value={maxInput}
                    keyboardType={'numeric'}
                    inputContainerStyle={styles.inputContainerPrice}
                    rightIcon={
                        <MaterialCommunityIcons name='currency-eur' color={'#444'} size={14} />
                    }
                    containerStyle={{
                        height: 30,
                        paddingHorizontal: 0
                    }}
                    inputStyle={{
                        paddingLeft: 5,
                        minHeight: 0
                    }}
                    errorStyle={{display :'none'}}
                    onChangeText={value => setMaxInput(value)}
                    onSubmitEditing={() => managePrice('max', maxInput)}
                    onBlur={() => managePrice('max', maxInput)}
                />
            </View>
        </View>
        <MultiSlider 
            values={priceRange}
            containerStyle={{
                position: 'relative'
            }}
            onValuesChange={priceRangeChange}
            sliderLength={320}
            min={10}
            max={500}
            step={1}
            markerStyle={{
                height: 25,
                width: 15
            }}
            pressedMarkerStyle={{
                height: 25,
                width: 15
            }}
            trackStyle={{
                height: 4
            }}
            allowOverlap
            snapped
        />
        </>
    )
}

const styles = StyleSheet.create({
    inputContainerPrice: {
        width: 80,
        height: 30,
        paddingVertical: 0,
        marginVertical: 0,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    }
})