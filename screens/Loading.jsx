import React from 'react';

import { StyleSheet, View, Image } from 'react-native';

import { Flow } from 'react-native-animated-spinkit';

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
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: 50,
        height: 50,
        marginBottom: 10
    }
})
