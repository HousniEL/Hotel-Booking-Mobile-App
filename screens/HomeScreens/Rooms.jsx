import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    ScrollView
} from 'react-native';

import { Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';
import AddRoom from './AddRoom';

import { useRooms } from './contexts/RoomsContext';

export default function Rooms({ navigation }) {

    var { rooms, addRoom, deleteRoom } = useRooms();

    const [ roomsNum, setRoomsNum ] = React.useState(rooms.length);
    const [ table, setTable ] = React.useState([1]);

    function handleRooms(type){
        if(type === "minus"){
            deleteRoom();
            setRoomsNum(rooms.length);
            var tableCopy = table;
            tableCopy.pop();
            setTable(tableCopy);
        } else {
            addRoom();
            setRoomsNum(rooms.length);
            var tableCopy = table;
            tableCopy.push(rooms.length);
            setTable(tableCopy)
        }
    }

    function handleApply(){
        console.log(rooms);
    }

    return (
        <>
            <StatusBar backgroundColor={Global.primary} /> 
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: 'rgba(0,0,0,0.2)',
                borderBottomWidth: 1
            }}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={1}
                    style={{
                        marginLeft: 5,
                        paddingVertical: 10,
                        height: '100%'
                    }}
                    onPress={() => { navigation.pop() }}
                >
                        <MaterialCommunityIcons name='arrow-left' color={'#000'} size={30} />
                </TouchableHighlight>
                <Text
                    style={{
                        marginLeft: 20,
                        fontSize: 22,
                        paddingBottom: 3
                    }}
                >Rooms {'&'} persons</Text>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: Global.primary
                }}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    padding: 20
                }}
            >
                    <View style={styles.containerelement}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.title}>Rooms</Text>
                            <View style={{ flexDirection: 'row', width: '45%', justifyContent: 'space-around', alignItems: 'center'}}>
                                <Button 
                                    title=''
                                    icon={
                                        <MaterialCommunityIcons 
                                            name={'minus'} 
                                            color={(roomsNum !== 1) ? Global.buttonbg1 : '#666'} 
                                            size={15} 
                                        />
                                    }
                                    buttonStyle={styles.buttonstyle}
                                    titleStyle={{ display: 'none' }}
                                    onPress={() => handleRooms('minus') }
                                    disabled={roomsNum === 1}
                                    disabledStyle={{
                                        backgroundColor: 'none',
                                        borderColor: "#666",
                                        borderWidth: 1,
                                    }}
                                />
                                <Text style={styles.number}>{roomsNum}</Text>
                                <Button 
                                    title=''
                                    icon={
                                        <MaterialCommunityIcons name={'plus'} color={Global.buttonbg1} size={15} />
                                    }
                                    buttonStyle={styles.buttonstyle}
                                    titleStyle={{ display: 'none' }}
                                    onPress={() => handleRooms('plus')}
                                />
                            </View>
                        </View>
                    </View>
            
                    {  
                        table.map( (value, idx) => (
                            <AddRoom key={idx} number={value} />
                        ) )
                    }

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: 340}}>
                        <Button 
                            title='Apply'
                            containerStyle={{
                                width: '100%'
                            }}
                            buttonStyle={{
                                backgroundColor: Global.secondary,
                                width: '100%',
                                paddingVertical: 10
                            }}
                            titleStyle={{
                                fontSize: 17
                            }}
                        />
                    </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    buttonstyle: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderColor: Global.buttonbg1,
        borderWidth: 1,
        borderRadius: 50,
        padding: 5
    },
    containerelement: {
        width: 340,
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        marginBottom: 15,
        backgroundColor: '#FFF'
    },
    title: {
        width: '55%',
        fontSize: 16,
        fontWeight: '600' 
    },
    number: {
        fontSize: 18,
        fontWeight: '600',
        borderColor: Global.buttonbg1,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 15
    }
})