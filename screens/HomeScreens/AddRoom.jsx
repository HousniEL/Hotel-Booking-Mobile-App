import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import { useRooms } from './contexts/RoomsContext';

export default function AddRoom({ number }) {

    const { appliedRooms, modifieRoom } = useRooms();

    const [adultsNum, setAdultsNum] = React.useState(appliedRooms[number - 1].adults);
    const [childrensNum, setChildrensNum] = React.useState(appliedRooms[number - 1].childrens);

    function handleAddition(type){
        if( type === 'adult' ){
            const numberA = (adultsNum == 4)? 4 : adultsNum + 1 ;
            setAdultsNum( numberA );
            modifieRoom(number, numberA);
        } else {
            const numberC = (childrensNum == 4)? 4 : childrensNum + 1  ;
            setChildrensNum(numberC); 
            modifieRoom(number, null, numberC);  
        }
    }

    function handleSubstraction(type){
        if( type === 'adult' ){
            const numberA = (adultsNum == 0)? 0 : adultsNum - 1 ;
            setAdultsNum(numberA);
            modifieRoom(number, numberA);
        } else {
            const numberC = (childrensNum == 0)? 0 : childrensNum - 1;
            setChildrensNum(numberC);
            modifieRoom(number, null, numberC);
        }
    }

    return (
        <View style={styles.containerelement}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginBottom: 10
                }}
            >Room { number }</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <Text style={styles.title}>Adults</Text>
                <View style={{ flexDirection: 'row', width: '45%', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Button 
                        title=''
                        icon={
                            <MaterialCommunityIcons 
                                name={'minus'} 
                                color={ (adultsNum !== 1) ? Global.buttonbg1 : '#666'} 
                                size={15} 
                            />
                        }
                        buttonStyle={styles.buttonstyle}
                        titleStyle={{ display: 'none' }}
                        onPress={() => handleSubstraction('adult')}
                        disabled={adultsNum === 1}
                        disabledStyle={{
                            backgroundColor: 'none',
                            borderColor: "#666",
                            borderWidth: 1,
                        }}
                    />
                    <Text style={styles.number}>{adultsNum}</Text>
                    <Button 
                        title=''
                        icon={
                            <MaterialCommunityIcons 
                                name={'plus'} 
                                color={ (adultsNum !== 4) ? Global.buttonbg1 : '#666'} 
                                size={15} 
                            />
                        }
                        buttonStyle={styles.buttonstyle}
                        titleStyle={{ display: 'none' }}
                        onPress={() => handleAddition('adult')}
                        disabled={adultsNum === 4}
                        disabledStyle={{
                            backgroundColor: 'none',
                            borderColor: "#666",
                            borderWidth: 1,
                        }}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.title}>Childrens</Text>
                <View style={{ flexDirection: 'row', width: '45%', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Button 
                        title=''
                        icon={
                            <MaterialCommunityIcons 
                                name={'minus'} 
                                color={(childrensNum !== 0) ? Global.buttonbg1 : '#666'} 
                                size={15} 
                            />
                        }
                        buttonStyle={styles.buttonstyle}
                        titleStyle={{ display: 'none' }}
                        onPress={() => handleSubstraction('child')}
                        disabled={childrensNum === 0}
                        disabledStyle={{
                            backgroundColor: 'none',
                            borderColor: "#666",
                            borderWidth: 1,
                        }}
                    />
                    <Text style={styles.number}>{childrensNum}</Text>
                    <Button 
                        title=''
                        icon={
                            <MaterialCommunityIcons 
                                name={'plus'} 
                                color={ (childrensNum !== 4) ? Global.buttonbg1 : '#666' } 
                                size={15} 
                            />
                        }
                        buttonStyle={styles.buttonstyle}
                        titleStyle={{ display: 'none' }}
                        onPress={() => handleAddition('child')}
                        disabled={childrensNum === 4}
                        disabledStyle={{
                            backgroundColor: 'none',
                            borderColor: "#666",
                            borderWidth: 1,
                        }}
                    />
                </View>
            </View>
        </View>
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