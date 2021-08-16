import React, { useEffect, useState, useRef } from 'react';

import { isEmpty } from 'lodash';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    Animated,
    Dimensions
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import MaterialComunnityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Global from '../Global';

import { useDate } from '../HomeScreens/contexts/DateContext';
import { useFilter } from '../HomeScreens/contexts/FilterContext';
import { useRooms } from '../HomeScreens/contexts/RoomsContext';

import Filter from '../HomeScreens/Filter';
import DateD from '../HomeScreens/Date';
import Rooms from '../HomeScreens/Rooms';
import SortByMain from '../HomeScreens/SortBy';
import LessDetail from '../HotelAd/LessDetail';
import MoreDetail from '../HotelAd/MoreDetail';
import RoomType from '../HotelAd/RoomType';
import CheckPage from '../Book/CheckPage';

import { createStackNavigator } from '@react-navigation/stack';

import { FilterProvider } from '../HomeScreens/contexts/FilterContext';
import { RoomsProvider } from '../HomeScreens/contexts/RoomsContext';
import { DateProvider } from '../HomeScreens/contexts/DateContext';
import { SortProvider } from '../HomeScreens/contexts/SortByContext';

import { hotels } from '../../varGlobal';

const Stack = createStackNavigator();

function HomeMain({ navigation, hotels }) {

    const translationHeader = useRef(new Animated.Value(Number(-180))).current;
    const translationContent = useRef(new Animated.Value(Number(190))).current;

    const [headerShown, setHeaderShown] = useState(true);
    const [wait, setWait] = useState(false);

    const { totalPandR } = useRooms();

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

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translationHeader, {
                toValue: headerShown ? 0 : -180,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(translationContent, {
                toValue: headerShown ? 190 : 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();
    }, [headerShown])

    async function navigateTo(screenName){
        navigation.navigate(screenName);
    }

    return (
        <>
            <StatusBar backgroundColor={Global.primary} />
            <Animated.View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: [
                  { translateY: translationHeader },
                ]
            }}>
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
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
                        <View style={styles.dateANDroomcontainer} >
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                style={{ width: '50%'}}
                                disabled={wait}
                                onPress={ () => navigateTo('date') }
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
                                disabled={wait}
                                onPress={ () => navigateTo('rooms')}
                            >
                                <View style={{ paddingHorizontal: 20 }}>
                                    <Text style={styles.tags}>Rooms</Text>
                                    <Text style={styles.choice} numberOfLines={1}>
                                        { totalPandR() }
                                    </Text>
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
                                        <MaterialComunnityIcons 
                                            name={'tune'} 
                                            color={Global.buttonbg1} 
                                            size={20}
                                        />
                                    }
                                    titleStyle={styles.buttontitlestyle}
                                    disabled={wait}
                                    onPress={ () => navigateTo('filter') }
                                />  
                            </TouchableHighlight>
                            <SortByMain />
                        </View>
                    </View>
                </View>
            </Animated.View>
            <Animated.ScrollView
                onScroll={(event) => {
                    const scrolling = event.nativeEvent.contentOffset.y;
                    if (scrolling > 200 ) {
                        setHeaderShown(false);
                    } else {
                        setHeaderShown(true);
                    }
                }}
                // onScroll will be fired every 16ms
                scrollEventThrottle={16}
                style={{ 
                    flex: 1, 
                    paddingVertical:10,
                    maxHeight: headerShown === true ?  Dimensions.get('window').height - 174 : null ,
                    transform: [ { translateY: translationContent } ] }}
            >
                <View style={{ flex: 1}}>
                    {
                        hotels.map((value, idx) => (
                            <LessDetail key={idx.toString()} hotel={value} navigation={navigation} />
                        ))
                    }
                </View>
            </Animated.ScrollView>
            {
                headerShown === false ? (
                    <View
                        style={{
                            position: 'absolute',
                            width: 60,
                            bottom: 10,
                            left: 10
                        }}
                    >
                        <Button
                            title=''
                            titleStyle={{ display: 'none' }}
                            icon={
                                <MaterialComunnityIcons 
                                    name="book-search"
                                    color={'white'}
                                    size={25}
                                />
                            }
                            containerStyle={{
                                borderRadius: 200,
                                elevation: 10
                            }}
                            buttonStyle={{
                                backgroundColor: Global.tabactive,
                                borderRadius: 200,
                                width: 60,
                                height: 60
                            }}
                            onPress={() => setHeaderShown(true) }
                        />
                    </View>
                ) : (null)
            }
            
        </>
    )
}

export default function Home(){

    const [allHotels, setAllHotels] = useState(hotels)

    return (
        <FilterProvider>
            <RoomsProvider>
                <DateProvider>
                    <SortProvider>
                        <Stack.Navigator
                            initialRouteName="homeMain"
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="homeMain">
                                { props => <HomeMain {...props} hotels={allHotels} /> }    
                            </Stack.Screen>
                            <Stack.Screen name="filter" component={Filter} />
                            <Stack.Screen name="date" component={DateD} />
                            <Stack.Screen name="rooms" component={Rooms} />
                            <Stack.Screen name="hotelInfo" component={MoreDetail} />
                            <Stack.Screen name="roomInfo" component={RoomType} />
                            <Stack.Screen name="checkPage" component={CheckPage} />
                        </Stack.Navigator>
                    </SortProvider>
                </DateProvider>
            </RoomsProvider>
        </FilterProvider>
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
        position: 'relative',
        flexDirection: 'row',
        width: '100%'
    },
    dateANDroomcontainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 8,
        borderColor: 'transparent',
        borderBottomColor: Global.buttonbg1,
        borderBottomWidth: 1,
        borderTopColor: Global.buttonbg1,
        borderTopWidth: 1 
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