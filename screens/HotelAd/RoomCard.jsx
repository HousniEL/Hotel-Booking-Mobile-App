import React from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function RoomCard({ room }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.roomType}>{room.Room_Type}</Text>
                <View>
                    {
                        room.getThreeCharacteristics().map( (char, idx) => (
                            <Text style={{ color: '#999', marginLeft: 8 }} key={idx.toString()}>
                                { '- ' + char }
                            </Text>
                        ))
                    }
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{fontSize: 20, fontWeight: '700', color: "#2a7800"}}>{room.Price + '$'}</Text>
                        <Text style={{fontSize: 10, fontWeight: '700', color: "#2a7800"}}>per night</Text>
                    </View>
                    <MaterialCommunityIcons name='chevron-right' color={'#2a7800'} size={22} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: '#2a7800',
        borderWidth: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    roomType:{
        fontSize: 16,
        fontWeight: '700',
        color: '#555'
    }
})