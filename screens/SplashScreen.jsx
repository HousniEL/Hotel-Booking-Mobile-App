import React from 'react';
import {
    View,
    Text,
    Animated,
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
    const translationLeft = React.useRef(new Animated.Value(Number(70))).current;
    const titleOpacity = React.useRef(new Animated.Value(Number(0))).current;

    const [ show, setShow ] = React.useState(true);

    React.useEffect(() => {

        Animated.parallel([
            Animated.timing(translationLeft, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
                timing: 'easing',
                delay: 2500
            }),
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                delay: 3300
            })
        ]).start();
    }, []);


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
    setTimeout(check, 4000);

    function removeLoadin(){
        setShow(false);
    }

    setTimeout(removeLoadin, 2000);

    return (
        <View style={{ flexGrow: 1, height: '100%' }}>
            <LinearGradient 
                style={[ styles.background, { height: Dimensions.get('screen').height }]}
                colors={[Global.primary, Global.secondary]}
            />
            <View style={styles.container}>
                <Animated.View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get('window').height/3 }}>
                    <Animated.Image 
                        style={{
                            width: 65,
                            height: 65,
                            transform: [
                                { 
                                    translateX: translationLeft 
                                }
                            ]
                        }}
                        source={require('../assets/Images/logo-white.png')}
                    />
                    <Animated.View
                        style={{
                            opacity: titleOpacity
                        }}
                    >
                        <Text style={ styles.title }>Hotels</Text>
                        <Text style={ styles.title }>Reservation</Text>
                    </Animated.View>
                </Animated.View>
                <View style={{ position: 'absolute', bottom: 100 }}>
                    <Flow style={ show ? null : { display: 'none' } } size={35} color='white' />
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
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        marginLeft: 10
    }
})