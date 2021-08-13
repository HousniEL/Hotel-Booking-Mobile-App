import React from 'react';

import {
    View
} from 'react-native';

import { Button } from 'react-native-elements';

import Global from '../../Global';

import { useFilter } from '../contexts/FilterContext';

export default function Apply({ navigation }){

    const { ApplyIt } = useFilter();

    function handleApply(){
        ApplyIt();
        navigation.push('homeMain')
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