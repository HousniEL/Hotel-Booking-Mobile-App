import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    ScrollView
} from 'react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Rating from './Filter/Rating';
import Location from './Filter/Location';
import Price from './Filter/Price';
import Suggested from './Filter/Suggested';
import Apply from './Filter/Apply';

import { LocationProvider } from './contexts/LocationContext';

import Global from '../Global';


export default function Filter({ navigation }) {

    return (
        <>
            <StatusBar backgroundColor={Global.primary} /> 
            <View style={styles.bigContainer}>
                <Text
                    style={{
                        fontSize: 21,
                        fontWeight: '700',
                        color: '#FFF',
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >Filter</Text>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    style={{
                        paddingVertical: 15,
                        paddingLeft: 10,
                        height: '100%',
                        width: '10%',
                    }}
                    onPress={() => navigation.pop()}
                >
                    <MaterialCommunityIcons name='arrow-left' color={'white'} size={24}
                        style={{
                            padding: 0,
                            width: 24,
                            height: 24
                        }}
                    />
                </TouchableHighlight>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    padding: 20
                }}
            >
                <View style={styles.container}>
                    <View style={{marginBottom: 15}}>
                        <Text 
                            style={{fontSize: 14, fontWeight: '700', marginBottom: 10}}
                        >PRICE PER NIGHT</Text>
                        <View style={{alignSelf: 'flex-start'}}>
                            <Price />
                        </View>
                    </View>
                    <View style={{marginBottom: 30}}>
                        <Text 
                            style={{fontSize: 14, fontWeight: '700', marginBottom: 10}}
                        >HOTEL CATEGORY</Text>
                        <View style={{alignSelf: 'flex-start', flexDirection: 'row', width: 320, justifyContent: 'space-between'}}>
                            <Rating />
                        </View>
                    </View>
                    <View style={{marginBottom: 30}}>
                        <Text 
                            style={{fontSize: 14, fontWeight: '700', marginBottom: 10}}
                        >LOCATION</Text>
                        <View style={{alignSelf: 'flex-start', flexDirection: 'row', width: 320, justifyContent: 'space-between'}}>
                            <LocationProvider>
                                <Location />
                            </LocationProvider>
                        </View>
                    </View>
                    <View>
                        <Text 
                            style={{fontSize: 14, fontWeight: '700', marginBottom: 10}}
                        >SUGGESTED FILTERS</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: 320}}>
                            <Suggested />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Apply navigation={navigation} />
        </>
    )
}

const styles = StyleSheet.create({
    bigContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Global.primary
    },
    container: {
        flex: 1,
        width: 350,
        alignItems: 'center'
    },
    inputContainerPrice: {
        width: 80,
        height: 30,
        paddingVertical: 0,
        marginVertical: 0,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    }
})