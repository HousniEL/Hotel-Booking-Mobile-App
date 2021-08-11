import React, { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import MaterialComunnityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Global from '../Global';

import { useDate } from '../HomeScreens/contexts/DateContext';

import Filter from '../HomeScreens/Filter';
import DateD from '../HomeScreens/Date';
import Rooms from '../HomeScreens/Rooms';
import SortByMain from '../HomeScreens/SortBy';


import { createStackNavigator } from '@react-navigation/stack';
import { DateProvider } from '../HomeScreens/contexts/DateContext';

const Stack = createStackNavigator();

function HomeMain({ navigation }) {

    const { appliedStartDay, appliedEndDay } = useDate();

    const [ dateString, setDateString ] = useState("From - To");

    useEffect(() => {
        if(!isEmpty(appliedStartDay) && !isEmpty(appliedEndDay)){
            const startTab = appliedStartDay.dayFormat.split(' ');
            const endTab = appliedEndDay.dayFormat.split(' ');
            const from = `${startTab[0]} ${startTab[1].toLowerCase()}`;
            const to = `${endTab[0]} ${endTab[1].toLowerCase()}`;
            setDateString(from + ' - ' + to);
        } else {
            setDateString('From - To');
        }
    }, [])

    return (
        <>
            <StatusBar backgroundColor={Global.primary} />
            <View style={{flex: 1}}>
                <View style={{
                    width: "100%",
                    alignItems: 'center',
                    backgroundColor: Global.primary,
                    paddingTop: 15
                }}>
                    <Input 
                        placeholder="Search"
                        keyboardAppearance={'default'}
                        keyboardType={'default'}
                        autoCorrect={false}
                        rightIcon={
                            <MaterialComunnityIcons name="magnify" color={'#555'} size={20} />
                        }
                        rightIconContainerStyle={{
                            width: 30
                        }}
                        containerStyle={{
                            paddingHorizontal: 0,
                            width: 320,
                        }}
                        inputStyle={styles.input}
                        placeholderTextColor={"#888"}
                        inputContainerStyle={styles.inputcontainer}
                        errorStyle={{
                            display: 'none'
                        }}
                    />
                    <View style={{marginTop: 20, width: '100%', backgroundColor: 'transparent'}}>
                        <View style={[styles.buttonscontainer,
                            {
                                paddingVertical: 8,
                                borderColor: 'transparent',
                                borderBottomColor: Global.buttonbg1,
                                borderBottomWidth: 1,
                                borderTopColor: Global.buttonbg1,
                                borderTopWidth: 1 
                            }
                        ]} >
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                style={{ width: '50%'}}
                                onPress={ () => { navigation.push('date') } }
                            >
                                <View style={{ borderRightColor: Global.buttonbg1, borderRightWidth: 1, paddingHorizontal: 20 }}>
                                    <Text style={styles.tags} >Dates</Text>
                                    <Text style={styles.choice} numberOfLines={1}>
                                        { dateString }       
                                    </Text>
                                </View>
                            </TouchableHighlight> 
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                style={{width: '50%'}}
                                onPress={ () => { navigation.push('rooms') } }
                            >
                                <View style={{ paddingHorizontal: 20 }}>
                                    <Text style={styles.tags}>Rooms</Text>
                                    <Text style={styles.choice} numberOfLines={1}>2 persons - 1 chamber</Text>
                                </View>
                            </TouchableHighlight> 
                        </View>
                        <View style={styles.buttonscontainer} >
                            <TouchableHighlight 
                                underlayColor={'transparent'}
                                style={{width: '50%'}}
                            >
                                <Button 
                                    title='FILTER'
                                    buttonStyle={styles.buttonstyle}
                                    icon={
                                        <MaterialComunnityIcons name={'tune'} color={Global.buttonbg1} size={20} />
                                    }
                                    titleStyle={styles.buttontitlestyle}
                                    onPress={ () => { navigation.push('filter') } }
                                />  
                            </TouchableHighlight>
                            <SortByMain />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default function Home({ navigation, route }){

    return (
        <DateProvider>
            <Stack.Navigator
                initialRouteName="homeMain"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="homeMain" component={HomeMain} />
                <Stack.Screen name="filter" component={Filter} />
                <Stack.Screen name="date" component={DateD} />
                <Stack.Screen name="rooms" component={Rooms} />

            </Stack.Navigator>
        </DateProvider>
    )
}

const styles = StyleSheet.create({
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'white',
        padding: 10,
        height: 40,
        borderRadius: 30
    },
    input: {
        color: '#555',
        marginLeft: 2,
        fontSize: 14
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    buttonscontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    buttontitlestyle: {
        color: Global.buttonbg1, 
        marginLeft: 6, 
        fontSize: 14
    },
    tags: {
        color: '#AAA',
        fontSize: 12
    },
    choice: {
        color: '#EEE',
        fontSize: 14
    }
})