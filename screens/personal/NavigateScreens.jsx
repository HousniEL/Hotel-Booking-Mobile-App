import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//const BottomTab = createMaterialBottomTabNavigator();

import Home from './Home';
import Reservation from './Reservation';
import Notification from './Notification';
import Profile from './Profile';
import Favorite from  './Favorite';



import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export default function NavigateScreens() {

    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    return (
        <>
        <NavigationContainer independent={true} >
            <Drawer.Navigator
                screenOptions={{
                    drawerType: isLargeScreen ? 'permanent' : 'back',
                    overlayColor: 'transparent',
                    drawerActiveBackgroundColor: '#5CA19A',
                    drawerActiveTintColor: 'white'
                }}
                
            >
                <Drawer.Group screenOptions={{ presentation: 'modal' }}>
                    <Drawer.Screen 
                        name='Home'
                        component={Home}
                        options={{
                            headerShown: false,
                            drawerIcon : ({ color }) => (
                                <MaterialCommunityIcons name='home' color={color} size={26} />
                            )
                        }}
                    />
                    <Drawer.Screen 
                        name='Reservation'
                        component={Reservation}
                        options={{
                            drawerIcon : ({ color }) => (
                                <MaterialCommunityIcons name='calendar' color={color} size={26} />
                            )
                        }}
                        
                    />
                    <Drawer.Screen 
                        name='Favorite'
                        component={Favorite}
                        options={{
                            drawerIcon : ({ color }) => (
                                <MaterialCommunityIcons name='heart' color={color} size={26} />
                            )
                        }}
                    />
                    <Drawer.Screen 
                        name='Notification'
                        component={Notification}
                        ico
                        options={{
                            drawerIcon : ({ color }) => (
                                <MaterialCommunityIcons name='bell' color={color} size={26} />
                            )
                        }}
                    />
                    <Drawer.Screen 
                        name='Profile'
                        component={Profile}
                        options={{
                            drawerIcon : ({ color }) => (
                                <MaterialCommunityIcons name='account' color={color} size={26} />
                            )
                        }}
                    />
                </Drawer.Group>
            </Drawer.Navigator>
        </NavigationContainer>
        </>
    )
}
