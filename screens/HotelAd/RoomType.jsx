import React from 'react';
import { 
    View, 
    Text,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    StatusBar,
    Dimensions
} from 'react-native';

import Global from '../Global';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from 'react-native-elements';

export default function RoomType({ route, navigation }) {

    const { hotel, roomId } = route.params;

    return (
        <>
            <StatusBar backgroundColor={Global.primary} /> 
            <View style={styles.bigContainer}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.pop()}
                >
                    <MaterialCommunityIcons name='arrow-left' color={'#333'} size={24}
                        style={styles.backIcon}
                    />
                </TouchableWithoutFeedback>
                <View>
                    <Text style={{ fontSize: 18, color: '#333' }} >
                        { hotel.Hotel_Name }
                    </Text>
                    <Text style={{ fontSize: 12, color: '#888' }} >
                        { hotel.Address + ', ' + hotel.City }
                    </Text>

                </View>
            </View>
            <ScrollView style={{backgroundColor: '#DDD', flex: 1 }}>
                <View style={ [styles.infoContainer, { height: Dimensions.get('window').height } ] } >
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between'}} >
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#444' }}>
                            { hotel.rooms[roomId].Room_Type }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}} >
                        <Text style={{ fontSize: 18, color: '#555' }}>
                            Beds
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize:17, color: '#555'}}>{ hotel.rooms[roomId].Num_Persons + ' x ' }</Text>
                            <MaterialCommunityIcons 
                                name='bed'
                                color={'#555'}
                                size={22}
                                style={{padding: 0}}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}} >
                        <Text style={{ fontSize: 18, color: '#555' }}>
                            Room size
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize:17, color: '#555'}}>{ hotel.rooms[roomId].Size + ' m²' }</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10}} >
                        <Text style={{ fontSize: 18, color: '#555' }}>
                            Characteristics
                        </Text>
                        <View style={{flexWrap: 'wrap', marginTop: 5}}>
                            {
                                hotel.rooms[roomId].getAllCharacteristics().map( (value, idx) => (
                                    <View key={idx.toString()} style={{ flexDirection: 'row', padding: 5 }}>
                                        <MaterialCommunityIcons name="check" color={'#666'} size={20} />
                                        <Text style={{color: '#555'}}>
                                            { ' ' + value }
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    bigContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#BBB',
        borderBottomWidth: 1
    },
    backIcon: {
        padding: 0,
        marginVertical: 15,
        marginHorizontal: 10,
        width: 24,
        height: 24
    },
    infoContainer: {
        alignSelf: 'center', 
        width: '100%',
        maxWidth: 400, 
        height: '100%', 
        padding: 10, 
        flex: 1, 
        backgroundColor: 'white'
    }
})