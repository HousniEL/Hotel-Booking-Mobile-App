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
import { useDate } from '../HomeScreens/contexts/DateContext';
import { useBookingInfo } from '../../contexts/BookingInfoContext';
import { useAuth } from '../../contexts/AuthContext';

import Global from '../Global';

import CustomCalendar from '../HomeScreens/CustomCalendar';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomSelect from './CustomSelect';

export default function CheckPage({ route, navigation }) {

    const { hotel, hotelID } = route.params;

    var { startDay, endDay } = useDate();
    var { rooms, addRoom, deleteRoom, appliedRooms, resetRooms } = useRooms();
    var { Book, bookInfo } = useBookingInfo();
    var { currentUser } = useAuth();

    const [ table, setTable ] = useState([]);

    const [ reload, setReload ] = useState();

    const [ message, setMessage ] = useState();

    function reloadPage(){
        setReload(Math.random());
    }


    useEffect(() => {
        const ff = function(){
            resetRooms();
            if( !bookInfo ){
                var tableCopy = [];
                for(let i = 1; i < appliedRooms.length + 1; i++){
                    let object = {
                        number: i,
                        room: appliedRooms[i - 1],
                        id: null,
                        type: null,
                        price: null
                    }
                    tableCopy.push(object);
                }
                setTable(tableCopy);
            } else {
               setTable(bookInfo.table);
            }
        }

        ff();
    }, [])

    function handleRooms(type){
        if(type === "minus"){
            if(rooms.length != 1){
                deleteRoom();
                var tableCopy = table;
                tableCopy.pop();
                setTable(tableCopy);
                reloadPage();
            }
        } else {
            addRoom();
            var tableCopy = table;
            let object = {
                number: rooms.length,
                room: appliedRooms[rooms.length - 1],
                id: null,
                type: null,
                price: null
            }
            tableCopy.push(object);
            setTable(tableCopy);
            reloadPage();
        }
    }

    function handleNext(){
        setMessage();
        var setToGo = true;
        if( JSON.stringify(startDay) === "{}" ) {
            setToGo = false;
            setMessage('Set your check in date!');
        }
        if( setToGo && JSON.stringify(endDay) === "{}" ) {
            setToGo = false;
            setMessage('Set your check out date!');
        }
        if( setToGo ){
            table.map( value => {
                if( !value.type || !value.price ) {
                    setToGo = false;
                    setMessage('Select a room!');
                }
            } );
        }
        if( setToGo ){
            Book({
                Hotel_ID : hotelID,
                User_ID : currentUser.id,
                Date_From : startDay.day.year + '/' + startDay.day.month + '/' + startDay.day.day,
                Date_To : endDay.day.year + '/' + endDay.day.month + '/' + endDay.day.day,
                table : table
            })

            navigation.push("paymentPage", {
                payat : hotel.Services[1],
                hotelName : hotel.Hotel_Name
            });
            
        }
    }

    return (
        <>
            <StatusBar backgroundColor={Global.primary} barStyle={'default'} />

            <ScrollView>
                <View style={{flex: 1}}>
                    <View style={styles.greenArea}>
                    </View>
                    <TouchableOpacity underlayColor={'transparent'} onPress={() => navigation.pop()}>
                        <MaterialCommunityIcons name='arrow-left' style={{
                            paddingTop: 15,
                            paddingLeft: 10,
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
                                        table && table.map( (value, idx) => (
                                            <RoomDetail key={idx} number={value.number} table={table} setTable={setTable} hotel={hotel} />
                                        ) )
                                    }
                            </View>
                            {
                                message && (
                                    <View style={styles.warning}>
                                        <Text style={{ color: 'tomato', marginLeft: 10, fontSize: 14 }}>
                                            { message }
                                        </Text>
                                    </View>
                                )
                            }
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
                                        borderRadius: 50
                                    }}
                                    titleStyle={{
                                        fontSize: 15
                                    }}
                                    onPress={handleNext}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
        </>
    )
}

function RoomDetail({ number, hotel, table, setTable }){

    const { appliedRooms, modifieRoom, getTotalPsPerRoom } = useRooms();

    const [adultsNum, setAdultsNum] = React.useState(appliedRooms[number - 1].adults);
    const [childrensNum, setChildrensNum] = React.useState(appliedRooms[number - 1].childrens);

    function handleAdults(value){
        const numberA = value ;
        setAdultsNum( numberA );
        modifieRoom(number, numberA);
        var tableCpy = table.map( roomInfo => {
            if(roomInfo.number === number){
                var roomInfoCpy = roomInfo;
                roomInfoCpy['room']['adults'] = value;
                return roomInfoCpy;
            }
            return roomInfo;
        } );
        setTable(tableCpy);
    }

    function handleChildrens(value){
        const numberC = Number(value);
        setChildrensNum(numberC);
        modifieRoom(number, null, numberC);
        var tableCpy = table.map( roomInfo => {
            if(roomInfo.number === number){
                var roomInfoCpy = roomInfo;
                roomInfoCpy['room']['childrens'] = value;
                return roomInfoCpy;
            }
            return roomInfo;
        } );
        setTable(tableCpy);
    }

    function handleType(type){
        var tableCpy = table.map( roomInfo => {
            if(roomInfo.number === number){
                var roomInfoCpy = roomInfo;
                roomInfoCpy['id'] = type.id;
                roomInfoCpy['type'] = type.type;
                roomInfoCpy['price'] = type.price;
                return roomInfoCpy;
            }
            return roomInfo;
        } );
        setTable(tableCpy);
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
                <CustomSelect type={'type'} data={hotel.getRoomsType(hotel.getRoomsThatFit(getTotalPsPerRoom(number - 1)))} 
                    additionStyle={{ btn: { width: '100%', height: 45 }, btnTxt: { fontSize: 17 } }} 
                    handle={handleType}
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
        position: 'absolute'
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
    },
    warning: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FCE2E3',
        marginBottom: 20,
        alignItems: 'center'
    }
})