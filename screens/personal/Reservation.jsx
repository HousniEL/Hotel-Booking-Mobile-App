import React from 'react';
import {
    ScrollView,
    View
} from 'react-native';
import LessDetailResInfo from '../Reservation/LessDetailResInfo';

import * as SecureStore from 'expo-secure-store';

export default function Reservation() {

    SecureStore.getItemAsync('token').then( val => console.log(val) )

    return (
        <ScrollView style={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                {
                    [1, 2, 3, 4, 5].map( val => (
                        <LessDetailResInfo key={val} />
                    ) )
                }
            </View>
        </ScrollView>
    )
}
