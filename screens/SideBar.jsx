import React from 'react';

import { 
    StyleSheet, 
    View, 
    Text,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function SideBar({ isSignedIn, logout, supNavigation,  ...props }) {

    return (
        <>
            <View style={styles.container}>
                <Image 
                    style={styles.image}
                    source={require('../assets/Images/logo-green.png')}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Hotels
                    </Text>
                    <Text style={styles.title}>
                        Reservation
                    </Text>
                </View>
            </View>
            
            <DrawerContentScrollView { ...props }>
                <DrawerItemList { ...props } />
            </DrawerContentScrollView>
            <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                {
                    isSignedIn ? (
                        <TouchableWithoutFeedback onPress={logout} >
                            <View style={ styles.log } >
                                <MaterialCommunityIcons name='logout-variant' color="gray" size={22} style={{ marginRight: 10, width: 22, height: 22 }} />
                                <Text style={{ fontSize: 18, color: 'gray' }}>
                                    Sign Out
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={ () => {  
                                supNavigation.push('signup');
                            } }
                            style={{ borderRadius: 5 }}
                        >
                            <View style={ styles.log } >
                                <MaterialCommunityIcons name='login-variant' color="gray" size={22} style={{ marginRight: 10, width: 22, height: 22 }} />
                                <Text style={{ fontSize: 18, color: 'gray' }}>
                                    Sign In
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25
    },
    image: {
        width: 40,
        height: 40
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#444",
        borderColor: 'black',
        marginLeft: 10
    },
    divider: {
        marginVertical: 20, 
        marginHorizontal: 10, 
        alignSelf: 'center' 
    },
    log :{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingBottom: 10
    }
})
