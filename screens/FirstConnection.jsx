import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import Global from './Global';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Personal from './personal/Personal';
import Login from './personal/Login';
import Signup from './personal/Signup';
import NavigateScreens from './personal/NavigateScreens';

import { AuthProvider } from '../contexts/AuthContext';

const Root = createStackNavigator();

function Choice({ navigation }){
    return (
        <View style={{
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <TouchableHighlight>
                <Button 
                    title='Personal'
                    icon={
                        <Icon 
                            name='user'
                            size={26}
                            color={'#555'}
                        />
                    }
                    buttonStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 125,
                        height: 70,
                        backgroundColor: "#FFF"
                    }}
                    titleStyle={{
                        color: '#555'
                    }}
                    onPress={() => {
                        navigation.push('personal');
                    }}
                />
            </TouchableHighlight>
            <TouchableHighlight>
                <Button 
                    title='Hotel'
                    icon={
                        <Icon 
                            name='h-square'
                            size={26}
                            color={'#555'}
                        />
                    }
                    buttonStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 125,
                        height: 70,
                        backgroundColor: "#FFF"
                    }}
                    titleStyle={{
                        color: '#555'
                    }}
                    disabled
                />
            </TouchableHighlight>
        </View>
    )
}

function FirstConnection({ navigation }) {

    return (
        <View style={styles.container}>
            <Image 
                style={{
                    width: 60,
                    height: 60,
                    alignSelf: 'center',
                    marginTop: 140
                }}
                source={require('../assets/Images/logo-white.png')}
            />
            <Text style={[styles.title, { marginTop: 5 }]}>
                Hotels Reservation
            </Text>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                position: 'absolute',
                bottom: 75,
                width: 300,
                alignSelf: 'center'
            }}>
                <Text
                    style={{
                        alignSelf: 'center',
                        marginBottom: 20,
                        fontSize: 20,
                        color: '#EEE',
                        fontWeight: '600'
                    }}
                >Login As</Text>
                <Choice navigation={navigation} />
            </View>
        </View>
    )
}

export default function First(){
    return (
        <AuthProvider>
            <NavigationContainer independent={true}>
                <Root.Navigator screenOptions={{ headerShown: false }} >
                    <Root.Screen  name="first" component={FirstConnection} />
                    <Root.Screen  name="personal" component={Personal} />
                    <Root.Screen  name="signup" component={Signup} />
                    <Root.Screen  name="login" component={Login} />
                    <Root.Screen  name="navigatescreens" component={NavigateScreens} />
                </Root.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.primary
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '700',
        color: 'white'
    }
})
