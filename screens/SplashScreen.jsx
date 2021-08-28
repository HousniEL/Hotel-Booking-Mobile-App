import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    Dimensions
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { LinearGradient } from 'expo-linear-gradient';

import Global from './Global';

export default function Welcome({ handleSignIn }) {

    async function check(){
        const token = await SecureStore.getItemAsync('token');
        if(token){
            handleSignIn(true);
        } else {
            handleSignIn(false);
        }
    }
    setTimeout(check, 3000);

    return (
        <>
            <StatusBar backgroundColor={Global.primary} />
            <LinearGradient 
                style={[ styles.background, { height: Dimensions.get('screen').height }]}
                colors={[Global.primary, Global.secondary]}
            />
            <View style={styles.container}>
                <Image 
                    style={{
                        width: 60,
                        height: 60,
                        marginTop: '50%'
                    }}
                    source={require('../assets/Images/logo-white.png')}
                />
                <Text style={[styles.title, { marginTop: 5 }]}>
                    Hotels Reservation
                </Text>
                <View style={{ position: 'absolute', bottom: 100 }}>
                    <ActivityIndicator size={'large'} color={'white'} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
    container: {
        flex: 1,
        backgroundColor: Global.primary,
        alignItems: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 27,
        fontWeight: '700',
        color: 'white'
    }
})