import React, { useEffect } from 'react';

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

    var { rooms, addRoom, deleteRoom, appliedRooms, resetRooms, ApplyRooms } = useRooms();

    const [ roomsNum, setRoomsNum ] = React.useState(appliedRooms.length);
    const [ table, setTable ] = React.useState([]);

    useEffect(() => {
        const ff = function(){
            resetRooms();
            var tableCopy = [];
            for(let i = 1; i < appliedRooms.length + 1; i++){
                tableCopy.push(i);
            }
            setTable(tableCopy);
        }

        ff();
    }, [])

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
        ApplyRooms();
        navigation.push('homeMain');
    }

    return (
        <>
            <StatusBar backgroundColor={Global.primary} /> 
            <View style={styles.bigContainer}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#FFF',
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >Rooms {'&'} persons</Text>
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
                    backgroundColor: '#DDD'
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
                                paddingVertical: 10,
                                borderRadius: 20
                            }}
                            titleStyle={{
                                fontSize: 17
                            }}
                            onPress={handleApply}
                        />
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
        backgroundColor: Global.primary
    },
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