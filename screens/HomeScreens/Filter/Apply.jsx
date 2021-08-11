import React from 'react';

import {
    View,
    Dimensions
} from 'react-native';

import { Button } from 'react-native-elements';

import Global from '../../Global';

import { useFilter } from '../contexts/FilterContext';

export default function Apply(){

    const { getFilter } = useFilter();

    var height = Dimensions.get('window').height;

    function handleApply(){
        console.log(getFilter());
    }

    return (
        <View
            style={{
                top: 0,
                width: 330,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                padding: 10
            }}
        >
            <Button 
                title='Apply'
                containerStyle={{
                    borderRadius: 30
                }}
                buttonStyle={{
                    backgroundColor: Global.secondary,
                    borderRadius: 30
                }}
                onPress={handleApply}
            />
        </View>
    )
}