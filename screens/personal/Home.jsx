import React, { useEffect, useState, useRef } from 'react';

import { isEmpty } from 'lodash';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Animated,
    Dimensions
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import MaterialComunnityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Global from '../Global';

import Filter from '../HomeScreens/Filter';
import DateD from '../HomeScreens/Date';
import Rooms from '../HomeScreens/Rooms';
import SortByMain from '../HomeScreens/SortBy';
import LessDetail from '../HotelAd/LessDetail';
import MoreDetail from '../HotelAd/MoreDetail';
import RoomType from '../HotelAd/RoomType';
import CheckPage from '../Book/CheckPage';
import PaymentPage from '../Book/PaymentPage';

import { createStackNavigator } from '@react-navigation/stack';

import Loading from '../Loading';

import { GeneralFilterProvider, useGeneral } from '../HomeScreens/contexts/GeneralFilterContext';
import { FilterProvider, useFilter } from '../HomeScreens/contexts/FilterContext';
import { RoomsProvider, useRooms } from '../HomeScreens/contexts/RoomsContext';
import { DateProvider, useDate } from '../HomeScreens/contexts/DateContext';
import { SortProvider, useSort } from '../HomeScreens/contexts/SortByContext';
import { BookingProvider } from '../../contexts/BookingInfoContext';

import HotelService from '../../services/HotelService';
import Paginate from '../Paginate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

var width = ( ( Dimensions.get('window').width ) >= 355 ) ? 355 : Dimensions.get('window').width;

function HomeMain({ navigation, isSignedIn, drawerRoute }) {

    function displayMoreDetail(){
        var idC = drawerRoute.params['favoriteId'];
        if(drawerRoute.params['favoriteId']){
            delete drawerRoute.params['favoriteId'];
            navigation.push('hotelInfo', {
                hotelID: idC
            });
        }
    }

    drawerRoute.params && (
        setTimeout(displayMoreDetail, 500)
    )

    const [hotels, setHotels] = useState();

    const translationHeader = useRef(new Animated.Value(Number(0))).current;
    const translationContent = useRef(new Animated.Value(Number(190))).current;

    const [searchValue, setSearchValue] = useState("");
    const [headerShown, setHeaderShown] = useState(true);
    const [load, setload] = useState(false);
    const [twoColumns, setTwoColumns] = useState(false);
    const [paginate, setPaginate] = useState();

    const [ warning, setWarning ] = useState();

    const [ dateString, setDateString ] = useState("From - To");

    // Contexts
    const { generalFilter, setNewValue } = useGeneral();
    const { totalPandR, rooms, getTotalPsPerRoom } = useRooms();
    const { appliedStartDay, appliedEndDay } = useDate();
    const { toggleOverlay, updateSort } = useSort();

    useEffect(() => {
        var dim = (Dimensions.get('window').width - width*2);
        if( dim < 0 ){
            setTwoColumns(false);
        } else {
            setTwoColumns(true);
        }

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
    }, [headerShown]);

    useEffect(() => {
        setWarning();
        setHotels();
        var valueApp = [];
        for(let i = 0; i < rooms.length; i++){
            valueApp.push({ persons : getTotalPsPerRoom(i) });
        }
        setNewValue('rooms', valueApp);
        const hotelService = new HotelService();
        hotelService.getLessDetailHotels(generalFilter, (response) => {
            if(response) {
                hotelService.getLessDetailHotelsPerPage({ ids : response.slice(0, 1) }, (suc) => {
                    setHotels(suc);
                }, (err) => {
                    console.log(err);
                })
                setPaginate(<Paginate allIds={response} setItems={setHotels} fetchIds={hotelService.getLessDetailHotelsPerPage} perpage={1} />)
            }
        }, (error) => {
            if( error.message === "Network request failed" ){
                setWarning(' ');
            }
        });
        if(!isEmpty(generalFilter['search'])){
            setSearchValue(generalFilter['search'].value);
        }
    }, [load]);

    async function navigateTo(screenName){
        navigation.navigate(screenName);
    }


    function handleSortApply(value){
        updateSort(value);
        toggleOverlay();
        setNewValue('sortby', { value });
        setload(!load);
    }
    function handleSearchApply(event){
        setNewValue('search', { value : event.nativeEvent.text });
        setload(!load);
    }
    
    return (
        <>

            {
                hotels && (
                    <Animated.View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        transform: [
                            { translateY: translationHeader }
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
                                value={searchValue}
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
                                onChangeText={(text) => setSearchValue(text)}
                                onSubmitEditing={(e) => handleSearchApply(e)}
                            />
                            <View style={{marginTop: 20, width: '100%', maxWidth: 450, backgroundColor: 'transparent'}}>
                                <View style={styles.dateANDroomcontainer} >
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        style={{ width: '50%'}}
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
                                            onPress={ () => navigateTo('filter') }
                                        />  
                                    </TouchableHighlight>
                                    <SortByMain handleApply={handleSortApply} />
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
            {
                !warning ? (
                    <Animated.ScrollView
                        onScroll={(event) => {
                            const scrolling = event.nativeEvent.contentOffset.y;
                            if (scrolling > 300 ) {
                                setHeaderShown(false);
                            } else {
                                setHeaderShown(true);
                            }
                        }}
                        // onScroll will be fired every 16ms
                        scrollEventThrottle={16}
                        style={{ flex: 1, transform: [ { translateY: translationContent } ], }}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        {
                            hotels ? (
                                <Animated.View style={
                                    {
                                        flex: 1,
                                        width: '100%', 
                                        flexDirection: 'row', 
                                        flexWrap: 'wrap',            
                                        paddingVertical: 10,
                                        justifyContent: twoColumns ? 'flex-start' : 'center' 
                                    }
                                }>
                                    {
                                        hotels.length !== 0 ? (
                                            [1, 2, 3, 4, 5, 6, 7].map( val => (
                                                hotels.map((value, idx) => (
                                                    <LessDetail key={idx.toString()} hotel={value} navigation={navigation} isSignedIn={isSignedIn} />
                                                ))
                                            ) )
                                        ) : (
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '40%' }}>
                                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#777' }}>Sorry,</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#777' }}>
                                                    There is no hotel suites these critics.
                                                </Text>
                                            </View>
                                        )
                                    }
                                </Animated.View>
                            ) : (
                                    <View style={{ position: 'absolute', width: "100%", height: '50%' }}>
                                        <Loading />
                                    </View>
                                )
                            }
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                            { paginate && paginate }
                        </View>
                    </Animated.ScrollView>
                ) : (
                    <View style={{ flexGrow: 1, alignItems: 'center', paddingTop: '50%' }} >
                            <MaterialCommunityIcons name={'wifi-off'} color="#666" size={32} />
                            <Text style={{ marginTop: 5, fontSize: 22, fontWeight: '700', color: '#666'}}>
                                Something went wrong!
                            </Text>
                            <Text style={{ marginTop: 20,  fontSize: 16, color: '#666'}}>
                                Check if you are connected to internet.
                            </Text>
                        </View>
                )
            }
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

export default function Home({ isSignedIn, globalNavigation, navigation, route }){

    return (
        <>
            <GeneralFilterProvider>
                <FilterProvider>
                    <RoomsProvider>
                        <DateProvider>
                            <SortProvider>
                                <BookingProvider>
                                    <Stack.Navigator
                                        initialRouteName="homeMain"
                                        screenOptions={{ headerShown: false }}
                                    >
                                        <Stack.Screen name="homeMain">
                                            { props => <HomeMain {...props} isSignedIn={isSignedIn} drawerRoute={route} /> }    
                                        </Stack.Screen>
                                        <Stack.Screen name="filter" component={Filter} />
                                        <Stack.Screen name="date" component={DateD} />
                                        <Stack.Screen name="rooms" component={Rooms} />
                                        <Stack.Screen name="hotelInfo">
                                            { props => <MoreDetail {...props} isSignedIn={isSignedIn} globalNavigation={globalNavigation} /> }
                                        </Stack.Screen>
                                        <Stack.Screen name="roomInfo" component={RoomType} />
                                        {
                                            isSignedIn && (
                                                <>
                                                    <Stack.Screen name="checkPage" component={CheckPage} />
                                                    <Stack.Screen name="paymentPage">
                                                        { props => <PaymentPage {...props} drawerNavigation={navigation} /> }
                                                    </Stack.Screen>
                                                </>
                                            )
                                        }
                                    </Stack.Navigator>
                                </BookingProvider>
                            </SortProvider>
                        </DateProvider>
                    </RoomsProvider>
                </FilterProvider>
            </GeneralFilterProvider>
        </>
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