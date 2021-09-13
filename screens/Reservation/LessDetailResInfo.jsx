import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../Global';

const resInfo = {
    hotelName : 'Hotel Namedsfd sfsddsf dsfsd',
    Date_From : '2021-09-15',
    Date_To : '2021-09-20',
    numRooms : 2,
    numPers : 3,
    status: 'In Progress'
}

const status = new Map([
    ['In Progress', { color: 'orange', icon: 'clock-outline' }],
    ['Accepted', { color: 'green', icon: 'check-bold' }],
    ['Rejected', { color: 'red', icon: 'close-thick' }]
])

export default function LessDetailResInfo() {



    return (
        <View style={ styles.container }>
            <View style={[ styles.sectionContainer, { justifyContent: 'space-between' } ]}>
                <Text style={ styles.hotelName }>{ resInfo.hotelName }</Text>
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
                    { resInfo.numPers } guests, { resInfo.numRooms } rooms.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name={status.get(resInfo.status).icon} size={15} color={status.get(resInfo.status).color} style={{ marginRight: 5 }} />
                    <Text style={{ color: status.get(resInfo.status).color, fontSize: 15, fontWeight: 'bold' }}>{ resInfo.status }</Text>    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        maxWidth: 400,
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
        marginBottom: 10,
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
