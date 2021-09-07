import React from 'react';

import { StyleSheet, View, Image } from 'react-native';

import { Flow } from 'react-native-animated-spinkit';

import Global from './Global';

export default function Loading() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/Images/logo-gray.png')}
                style={styles.image}
            />
            <Flow size={40} color={"#c3c3c3"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: 45,
        height: 45,
        marginBottom: 10
    }
})
