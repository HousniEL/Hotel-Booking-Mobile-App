import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { Button, Divider } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import LogoSide from '../../LogoSide';

export default function Personal({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <MaterialCommunityIcons 
                    name='arrow-left' 
                    color={'gray'} 
                    size={30} 
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 10
                    }}
                    onPress={() => {
                        navigation.pop();
                    }}
                /> 
                <LogoSide />
                <Button 
                    title='Guest'
                    buttonStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 200,
                        height: 45,
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        borderColor: Global.secondary,
                        borderWidth: 2,
                    }}
                    titleStyle={{
                        color: Global.secondary
                    }}
                    onPress={() => {
                        navigation.push('navigatescreens')
                    }}
                />      
                
                <View style={{ position: 'relative', width: '90%', maxWidth: 400, marginVertical: 30, alignSelf: 'center' }}>
                    <Divider orientation={'horizontal'} width={2} />
                    <Text style={ styles.orText }>Or</Text>
                </View>
                
                <Button 
                    title='Create an account'
                    buttonStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 200,
                        height: 45,
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        borderColor: Global.secondary,
                        borderWidth: 2,
                    }}
                    titleStyle={{
                        color: Global.secondary
                    }}
                    onPress={() => {
                        navigation.push('login')
                    }}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#eee'
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#777',
        marginVertical: 20
    },
    orText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'gray', 
        position: 'absolute', 
        bottom: -10,
        left: '45%',
        width: 40,
        textAlign: 'center',
        backgroundColor: '#eee'
    }
})