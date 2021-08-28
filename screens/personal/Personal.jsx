import React from 'react';

import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { Button } from 'react-native-elements';

import Global from '../Global';

import LogoSide from '../../LogoSide';

import { LinearGradient } from 'expo-linear-gradient';

export default function Personal({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <LinearGradient 
                    style={[ styles.background, { height: Dimensions.get('screen').height }]}
                    colors={[Global.primary, Global.tabactive]}
                />
                <View style={{ marginTop: '30%' }}>
                    <LogoSide />
                </View>
                <View style={styles.buttonsView}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <Button 
                            title='Log In'
                            containerStyle={{ width: '48%', height: 50, marginBottom: 20, borderRadius: 5 }}
                            buttonStyle={[styles.buttonStyle, {                       
                                borderColor: "white",
                                borderWidth: 1,
                                backgroundColor: 'transparent'
                            }]}
                            titleStyle={{
                                color: "white"
                            }}
                            onPress={() => {
                                navigation.push('login')
                            }}
                        />
                        <Button 
                            title='Sign Up'
                            containerStyle={{ width: '48%', height: 50, marginBottom: 20 }}
                            buttonStyle={[styles.buttonStyle, {                       
                                backgroundColor: 'transparent',
                            }]}
                            titleStyle={{
                                color: "white"
                            }}
                            onPress={() => {
                                navigation.push('signup')
                            }}
                        />
                    </View>
                    <Button 
                        title='Continue as a guest'
                        containerStyle={{ width: '100%', height: 50, borderRadius: 5 }}
                        buttonStyle={[styles.buttonStyle, {                     
                            backgroundColor: "#555",
                        }]}
                        titleStyle={{
                            color: 'white'
                        }}
                        onPress={() => {
                            navigation.push('navigatescreens')
                        }}
                    />
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
        justifyContent: "center"
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#777',
        marginVertical: 20
    },
    buttonStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 50,
        borderRadius: 5
    },
    buttonsView: {
        width: '80%',
        maxWidth: 400,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 50
    }
})