import React, { useState, useEffect } from 'react';

import { isEmpty } from 'lodash';

import {
    View,
    Text
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Calendar } from 'react-native-calendars';
import Global from '../Global';

import { useDate } from './contexts/DateContext';

export default function CustomCalendar({ search }) {

    const { startDay, endDay, appliedStartDay, appliedEndDay, startAgain, setCurrentPeriod, setStartAgain, resetPeriod } = useDate();

    const [ period, setPeriod ] = useState();

    useEffect(() => {
        if(!isEmpty(appliedStartDay) && !isEmpty(appliedEndDay)){
            resetPeriod();
            setPeriod(getPeriod(appliedStartDay.day.timestamp, appliedEndDay.day.timestamp));
        } else if(!isEmpty(startDay) && !isEmpty(endDay)){
            setPeriod(getPeriod(startDay.day.timestamp, endDay.day.timestamp));
        }
    }, []);

    function getDateString(timestamp){
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        let dateString = `${year}-`;
        if( month < 10 ){
            dateString += `0${month}-`;
        } else {
            dateString += `${month}-`;
        }

        if( day < 10 ){
            dateString += `0${day}`;
        } else {
            dateString += `${day}`;
        }

        return dateString;
    }

    function getPeriod(startTimestamp, endTimestamp){
        const period = {};
        let currentTimestamp = startTimestamp;
        while( currentTimestamp <= endTimestamp ){
            const dateString = getDateString(currentTimestamp);
            period[dateString] = {
                color: Global.buttonbg1,
                textColor: 'white',
                startingDay: currentTimestamp == startTimestamp,
                endingDay: currentTimestamp == endTimestamp
            };
            currentTimestamp += 24 * 60 * 60 * 1000;
        }
        
        return period;
    }

    function setDate(dayObj){
        const { dateString, day, month, year } = dayObj;
        // timestamp returned by dayObj is in 12:00AM UTC 0, want local 12:00AM
        const timestamp = new Date(year, month - 1, day).getTime();
        let newDayObj = { ...dayObj, timestamp };
        if (startAgain) {
            const period = {
                [dateString]: {
                    color: Global.buttonbg1,
                    textColor: 'white',
                    endingDay: true,
                    startingDay: true
                }
            };
            setCurrentPeriod(newDayObj, null);
            setPeriod(period);
            setStartAgain(false);
        } else {
            // if end date is older than start date switch
            const { timestamp: savedTimestamp } = startDay.day;
            if (savedTimestamp > timestamp) {
                const period = getPeriod(timestamp, savedTimestamp);
                let startCopy = startDay.day;
                setCurrentPeriod(newDayObj, startCopy);
                setPeriod(period);
            } else {
                const period = getPeriod(savedTimestamp, timestamp);
                setCurrentPeriod(null, newDayObj);
                setPeriod(period);
            }
            setStartAgain(true);
        }
    }

    var today = new Date();

    return (
        <>
            <Calendar
                minDate={ new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2) }
                markingType={'period'}
                markedDates={period}

                style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                    elevation: 5,
                    borderRadius: 5
                }}
                theme={{
                    todayTextColor: Global.buttonbg1,
                    'stylesheet.calendar.main': {
                        week:{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: '#fff',
                            height: 40,
                        }
                    },
                    'stylesheet.calendar.header': {
                        header: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 45
                          },
                          monthText: {
                            fontSize: 16,
                            fontWeight: '700',
                            color: '#555'
                          }
                    }
                }}
                onDayPress={(date) => setDate(date)}
            />
            <View
                style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginTop: 20
                }}
            >   
                { !search && <Text style={{ fontWeight: '700', fontSize: 18, color: '#555', marginBottom: 8 }}>Date</Text> }
                <View style={[
                    { flexDirection: 'row', justifyContent: 'space-between' },
                    search && { justifyContent: 'space-evenly', marginTop: 50 }
                ]}>
                            <Text
                                style={{
                                    marginRight: 10,
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#666',
                                    alignSelf: 'center'
                                }}
                            >
                                { !isEmpty(startDay) ? startDay.dayFormat : "Check In" }
                            </Text>
                            <MaterialCommunityIcons 
                                name="ray-start-arrow" color={Global.buttonbg1} size={30} 
                                style={{width: 30, height: 30, alignSelf: 'center'}}    
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#666',
                                    alignSelf: 'center'
                                }}
                            >
                                { !isEmpty(endDay) ? endDay.dayFormat : "Check Out" }
                            </Text>
                   </View> 
            </View>
        </>
    )
}


/*
    <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}
            >   
                {
                    (!isEmpty(startDay) && !isEmpty(endDay)) && (
                        <>
                            <Text
                                style={{
                                    marginRight: 10,
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#666',
                                    alignSelf: 'center'
                                }}
                            >{ startDay.dayFormat }</Text>
                            <MaterialCommunityIcons 
                                name="ray-start-arrow" color={Global.buttonbg1} size={30} 
                                style={{width: 30, height: 30, alignSelf: 'center'}}    
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#666',
                                    alignSelf: 'center'
                                }}
                            >{ endDay.dayFormat }</Text>
                        </>
                    )
                }
            </View>
*/