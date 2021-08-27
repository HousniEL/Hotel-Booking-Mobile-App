import React, { useEffect } from 'react';

import { 
    TouchableHighlight, 
    Text,
    ScrollView,
    View,
    StyleSheet
} from 'react-native';

import { Button, Overlay } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFilter } from '../contexts/FilterContext';
import { useLocation } from '../contexts/LocationContext';

import Global from '../../Global';

export default function Location() {

    const { AddFilter, DeleteFilter, appliedFilter } = useFilter();

    const { location, visibleList, toggleOverlay, updateLocation } = useLocation();

    useEffect(() => {
        const ff = function(){
            if( appliedFilter['location'] ){
                updateLocation(appliedFilter['location'].value);
            }
            delete appliedFilter['location'];
        };

        ff();
    }, []);

    useEffect( () => {
        setFilter();
    }, [location] );

    function setFilter(){
        if(location){
            AddFilter('location', { value: location });
        } else {
            DeleteFilter('location');
        }
    }

    return (
        <>
        <TouchableHighlight
        underlayColor={'#AAA'}
        activeOpacity={0.8}
            style={{
                backgroundColor: '#CCC',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 10
            }}
            onPress={toggleOverlay}
        >
            <>
            <MaterialCommunityIcons 
                name="map-marker"
                color='#888'
                size={25}
            />
            <Text
                style={{marginLeft: 5, fontSize: 16}}
            >
                { (location) ? location : "Choose your preferred location." }
            </Text>
            </>
        </TouchableHighlight>
        <Overlay isVisible={visibleList} onBackdropPress={toggleOverlay} onPress={toggleOverlay}>
            <ScrollView 

                style={{width: 320, maxHeight: 400, marginBottom: 10}}>
                <LocationList />
            </ScrollView>
            <View
                style={{ alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <Button 
                    title='RESET'
                    buttonStyle={{
                        backgroundColor: '#555',
                        width: '100%'
                    }}
                    containerStyle={{
                        width: '100%'
                    }}
                    onPress={() => {
                        updateLocation();
                        toggleOverlay();
                    }}
                />
            </View>
        </Overlay>
        </>
    )
}

function LocationList(){

    const { location, updateLocation, toggleOverlay } = useLocation();

    const list = [
        'Marrakech',
        'Casablanca',
        'Rabat',
        'Fès',
        'Tanger'
    ];

    function handleItemPressed(value){
        updateLocation(value);
        toggleOverlay();
    }

    return (
        <View>
            {
            list.map( (value, idx) => (
                <TouchableHighlight 
                    underlayColor={'white'}
                    activeOpacity={1}
                    key={idx}
                    style={(value === location) ? styles.listActiveItem : styles.listInactiveItems}
                    onPress={() => handleItemPressed(value)}
                >
                    <Text style={[styles.label,
                        (value === location) ? {color: 'white'} : {color: 'black'}
                    ]}>{value}</Text>
                </TouchableHighlight>
            ) )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    listInactiveItems: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1 
    },
    listActiveItem: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomColor: 'transparent',
        backgroundColor: Global.tabactive,
        color: 'white'
    },
    label: {
        fontSize: 15
    }
})