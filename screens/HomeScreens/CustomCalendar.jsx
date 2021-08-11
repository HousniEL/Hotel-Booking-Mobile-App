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

export default function CustomCalendar() {

    const { startDay, endDay, appliedStartDay, appliedEndDay, startAgain, setCurrentPeriod, setStartAgain } = useDate();

    const [ period, setPeriod ] = useState();

    useEffect(() => {
        if(!isEmpty(appliedStartDay) && !isEmpty(appliedEndDay)){
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

    return (
        <>
            <Calendar
                markingType={'period'}
                markedDates={period}
                style={{
                    width: 340,
                    alignSelf: 'center',
                    marginTop: 10,
                    elevation: 5,
                    borderRadius: 5
                }}
                theme={{
                    todayTextColor: Global.buttonbg1
                }}
                onDayPress={(date) => setDate(date)}
            />
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}
            >   
                {
                    !isEmpty(startDay) && !isEmpty(endDay) && (
                        <>
                            <Text
                                style={{
                                    marginRight: 10,
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#666',
                                    alignSelf: 'center'
                                }}
                            >{startDay.dayFormat}</Text>
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
                            >{endDay.dayFormat}</Text>
                        </>
                    )
                }
            </View>
        </>
    )
}
