import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';

import { Button } from 'react-native-elements';

import { useRooms } from '../HomeScreens/contexts/RoomsContext';

import Global from '../Global';

import CustomCalendar from '../HomeScreens/CustomCalendar';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomSelect from './CustomSelect';

export default function CheckPage({ route, navigation }) {

    const { hotel } = route.params;

    var { rooms, addRoom, deleteRoom, appliedRooms, resetRooms } = useRooms();

    const [ table, setTable ] = useState([]);

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
            var tableCopy = table;
            tableCopy.pop();
            setTable(tableCopy);
        } else {
            addRoom();
            var tableCopy = table;
            tableCopy.push(rooms.length);
            setTable(tableCopy)
        }
    }

    return (
        <>
            <StatusBar backgroundColor={Global.primary} barStyle={'default'} />
            <View style={styles.greenArea}>
            </View>
            <ScrollView>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <MaterialCommunityIcons name='arrow-left' style={{
                            marginLeft: 10
                        }} size={25} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.mainHeader}>
                        Hotel Booking
                    </Text>
                    <View style={{ width: '90%', maxWidth: 400, alignSelf: 'center' }}>
                        <CustomCalendar />
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start', flex: 1, alignSelf: 'center' }}>   
                        <View style={{ width: '90%', maxWidth: 400, paddingTop: 25 }}>
                            <View style={{marginBottom: 10}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '700', fontSize: 18, color: '#555', marginBottom: 10 }}>
                                        Rooms
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={{marginRight: 10}}  onPress={() => handleRooms('plus') }>
                                            <MaterialCommunityIcons name='plus' color={'#555'} size={25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity  onPress={() => handleRooms('minus') } >
                                            <MaterialCommunityIcons name='minus' color={'#555'} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                    {   
                                        table.map( (value, idx) => (
                                            <RoomDetail key={idx} number={value} hotel={hotel} />
                                        ) )
                                    }
                            </View>
                            <View style={{flex: 1, alignSelf: 'center', justifyContent: 'flex-end', width: 175}}>
                                <Button 
                                    title='Next'
                                    containerStyle={{
                                        width: '100%',
                                        marginVertical: 20
                                    }}
                                    buttonStyle={{
                                        backgroundColor: Global.secondary,
                                        width: '100%',
                                        height: 45,
                                        paddingVertical: 10,
                                        borderRadius: 50,
                                        fontSize: 15
                                    }}
                                    titleStyle={{
                                        fontSize: 17
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
        </>
    )
}

function RoomDetail({ number, hotel }){

    const { appliedRooms, modifieRoom, getTotalPsPerRoom } = useRooms();

    const [adultsNum, setAdultsNum] = React.useState(appliedRooms[number - 1].adults);
    const [childrensNum, setChildrensNum] = React.useState(appliedRooms[number - 1].childrens);

    function handleAdults(value){
        const numberA = value ;
        setAdultsNum( numberA );
        modifieRoom(number, numberA);
    }

    function handleChildrens(value){
        const numberC = Number(value);
        setChildrensNum(numberC);
        modifieRoom(number, null, numberC);
    }

    return (
        <>
            <Text style={{ fontWeight: '700', fontSize: 17, color: '#797979', marginBottom: 10 }}>
                Room { number }
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', marginRight: 50, alignItems: 'center' }}>
                    <Text style={{marginRight: 10, fontSize: 15, fontWeight: '700', color: '#999'}}>Adults</Text>
                    <CustomSelect type={'adult'} data={[1, 2, 3, 4]} additionStyle={null} defaultValue={adultsNum} handle={handleAdults} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{marginRight: 10, fontSize: 15, fontWeight: '700', color: '#999'}}>Childrens</Text>
                    <CustomSelect type={'children'} data={["0", "1", "2", "3"]} additionStyle={null} defaultValue={childrensNum.toString()} handle={handleChildrens}  />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                <CustomSelect data={hotel.getRoomsType(hotel.getRoomsThatFit(getTotalPsPerRoom(number - 1)))} 
                    additionStyle={{ btn: { width: '100%', height: 45 }, btnTxt: { fontSize: 17 } }} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    greenArea : {
        width: '100%',
        height: 150,
        backgroundColor: Global.primary,
        position: 'absolute',
        elevation: -1
    },
    mainHeader : {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 3,
        fontWeight: '700',
        marginTop: 0,
        color: 'white'
    },
    buttonStyle : {
        width: 175,
        height: 45,
        backgroundColor: Global.secondary,
        borderRadius: 50,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    titleStyle : {
        fontSize: 17,
        paddingBottom: 5,
        paddingRight: 5
    }
})


/*
<View style={{ alignItems: 'center', paddingBottom: 15 }}>
                            <Button 
                                title='Next'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                            />
                        </View>
*/