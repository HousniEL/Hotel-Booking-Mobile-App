import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { LinearGradient } from 'expo-linear-gradient';

import Global from './Global';

import { useAuth } from '../contexts/AuthContext';

import { Flow } from 'react-native-animated-spinkit';

export default function Welcome({ handleSignIn }) {

    const { setCurrentUser } = useAuth();
    
    async function check(){
        const token = await SecureStore.getItemAsync('token');
        const user = await SecureStore.getItemAsync('user');
        if(token && user){
            setCurrentUser(JSON.parse(user));
            handleSignIn(true);
        } else {
            setCurrentUser();
            handleSignIn(false);
        }
    }
    setTimeout(check, 3000);

    return (
        <View style={{ flexGrow: 1, height: '100%' }}>
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
                    <Flow size={35} color='white' />
                </View>
            </View>
        </View>
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
        alignItems: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 27,
        fontWeight: '700',
        color: 'white'
    }
})