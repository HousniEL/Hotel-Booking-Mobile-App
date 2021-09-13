import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Reservation from './Reservation';
import Profile from './Profile';
import Favorite from  './Favorite';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

import SideBar from '../SideBar';

const Drawer = createDrawerNavigator();

export default function NavigateScreens({ logout, isSignedIn, navigation }) {

    const [ showProfileHeader, setShowProfileHeader ] = useState(true);

    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    return (
        <View style={{ flexGrow: 1, height: '100%' }}>
        <NavigationContainer independent={true} >
            <Drawer.Navigator
                drawerContent={ props => <SideBar {...props} isSignedIn={isSignedIn} logout={logout} supNavigation={navigation} /> }
                screenOptions={{
                    drawerType: isLargeScreen ? 'permanent' : 'back',
                    overlayColor: 'transparent',
                    drawerActiveBackgroundColor: '#5CA19A',
                    drawerActiveTintColor: 'white',
                    drawerType: 'front',
                    drawerStyle: {
                        elevation: 10
                    }
                }}
                
            >
                <Drawer.Group screenOptions={{ presentation: 'modal' }}>
                    <Drawer.Screen 
                        name='Home'
                        options={{
                            headerShown: false,
                            drawerIcon : ({ color, size }) => (
                                <MaterialCommunityIcons name='home' color={color} size={size} />
                            ),
                        }}
                    >
                        { props => <Home {...props} isSignedIn={isSignedIn} globalNavigation={navigation} /> }
                    </Drawer.Screen>
                        {
                            isSignedIn && (
                                <>

                                    <Drawer.Screen 
                                        name='Reservation'
                                        component={Reservation}
                                        options={{
                                            drawerIcon : ({ color, size }) => (
                                                <MaterialCommunityIcons name='calendar' color={color} size={size} />
                                            )
                                        }}
                                        
                                    />
                                    <Drawer.Screen 
                                        name='Favorite'
                                        component={Favorite}
                                        options={{
                                            drawerIcon : ({ color, size }) => (
                                                <MaterialCommunityIcons name='heart' color={color} size={size} />
                                            )
                                        }}
                                    />
                                    <Drawer.Screen 
                                        name='Profile'
                                        options={{
                                            headerShown: showProfileHeader,
                                            drawerIcon : ({ color, size }) => (
                                                <MaterialCommunityIcons name='account' color={color} size={size} />
                                            )
                                        }}
                                    >
                                        { (props) => <Profile {...props} showHeader={setShowProfileHeader} /> }
                                    </Drawer.Screen>
                                </>
                            )
                        }
                </Drawer.Group>
            </Drawer.Navigator>
        </NavigationContainer>
        </View>
    )
}
