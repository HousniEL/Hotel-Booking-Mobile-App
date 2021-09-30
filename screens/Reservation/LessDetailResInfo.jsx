import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../Global';

const status = new Map([
    ['In Progress', { color: 'orange', icon: 'clock-outline' }],
    ['Accepted', { color: 'green', icon: 'check-bold' }],
    ['Refused', { color: 'red', icon: 'close-thick' }]
])

export default function LessDetailResInfo({ resInfo }) {

    return (
        <View style={ styles.container }>
            <View style={[ styles.sectionContainer, { justifyContent: 'space-between' } ]}>
                <Text style={ styles.hotelName }>{ resInfo.Hotel_Name }</Text>
            </View>
            <View style={ styles.sectionContainer }>
                <Text style={ styles.sectionTitle }>Check-in : </Text>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>
                    { new Date(resInfo.Date_From).toDateString() } 
                </Text>
            </View>
            <View style={ styles.sectionContainer }>
                <Text style={ styles.sectionTitle }>Check-out : </Text>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>
                    { new Date(resInfo.Date_To).toDateString() } 
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={ styles.sectionTitle } >
                    { resInfo.Pers_Count } guests, { resInfo.Rooms_Count } rooms.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name={status.get(resInfo.Status).icon} size={15} color={status.get(resInfo.Status).color} style={{ marginRight: 5 }} />
                    <Text style={{ color: status.get(resInfo.Status).color, fontSize: 15, fontWeight: 'bold' }}>{ resInfo.Status }</Text>    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        paddingBottom: 20,
        margin: 10,
        alignSelf: 'center'
    },
    hotelName: {
        fontSize: 19,
        fontWeight: '700',
        color: Global.black,
        marginBottom: 5,
        maxWidth: '100%'
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7
    },
    sectionTitle: {
        fontSize: 15,
        color: '#555'
    }
})
