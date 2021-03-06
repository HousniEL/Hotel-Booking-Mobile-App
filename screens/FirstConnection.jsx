import React, { useState } from 'react';

import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './SplashScreen';
import Personal from './personal/Personal';
import Login from './personal/Login';
import Signup from './personal/Signup';
import NavigateScreens from './personal/NavigateScreens';
import EmailVerification from './EmailVerification';

import { AuthProvider } from '../contexts/AuthContext';

const Root = createStackNavigator();

import UserService from '../services/UserService';
import ForgotPassword from './personal/ForgotPassword';

export default function First(){
    
    const [ firstTime, setFirstTime ] = useState(true);

    const [ isSignedIn, setIsSignedIn ] = useState();

    function handleSignIn(bool){
        setIsSignedIn(bool);
        setFirstTime(false);
    }

    function logout(){
        const userService = new UserService();
        userService.LogOut(() => {
            setFirstTime(true);
        }, (err) => {
            console.log(err);
        })
    }

    function signed(){
        setIsSignedIn(true);
    }
    
    return (
        <View style={{ flexGrow: 1, height: '100%' }}>
            <AuthProvider>
                <NavigationContainer independent={true}  >
                    <Root.Navigator screenOptions={{ headerShown: false }}>
                    {
                        firstTime && (
                            <Root.Screen  name="first">
                                { (props) => <Welcome {...props} handleSignIn={handleSignIn} /> }
                            </Root.Screen>
                        )
                    }
                    {
                        !firstTime && (
                            isSignedIn ? (
                                <>
                                    <Root.Screen  name="navigatescreens">
                                        { (props) => <NavigateScreens {...props} isSignedIn={isSignedIn} logout={logout} /> }
                                    </Root.Screen>
                                </>
                            ) : (
                                <>
                                    <Root.Screen  name="personal" component={Personal} />
                                    <Root.Screen  name="login">
                                        { (props) => <Login {...props} signed={signed} /> }
                                    </Root.Screen>
                                    <Root.Screen  name="signup" component={Signup} />
                                    <Root.Screen  name="forgotpassword" component={ForgotPassword} /> 
                                    <Root.Screen  name="verification">
                                        { (props) => <EmailVerification {...props} signed={signed} /> }
                                    </Root.Screen>
                                    <Root.Screen  name="navigatescreens">
                                        { (props) => <NavigateScreens { ...props } isSignedIn={isSignedIn} /> }
                                    </Root.Screen>
                                </>
                            )
                        )
                    }
                    </Root.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </View>
    )
}