import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './SplashScreen';
import Personal from './personal/Personal';
import Login from './personal/Login';
import Signup from './personal/Signup';
import NavigateScreens from './personal/NavigateScreens';

import { AuthProvider } from '../contexts/AuthContext';

const Root = createStackNavigator();

export default function First(){
    
    const [ firstTime, setFirstTime ] = useState(true);

    const [ isSignedIn, setIsSignedIn ] = useState();

    function handleSignIn(bool){
        setFirstTime(false);
        setIsSignedIn(bool);
    }

    function signed(){
        setIsSignedIn(true);
    }
    
    return (
        <AuthProvider>
            <NavigationContainer independent={true}>
                <Root.Navigator screenOptions={{ headerShown: false }} >
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
                                    <Root.Screen  name="navigatescreens" component={NavigateScreens} />
                                </>
                            ) : (
                                <>
                                    <Root.Screen  name="personal" component={Personal} />
                                    <Root.Screen  name="login">
                                        { (props) => <Login {...props} signed={signed} /> }
                                    </Root.Screen>
                                    <Root.Screen  name="signup">
                                        { (props) => <Signup {...props} signed={signed} /> }
                                    </Root.Screen>
                                    <Root.Screen  name="navigatescreens" component={NavigateScreens} />
                                </>
                            )
                        )
                    }
                </Root.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}