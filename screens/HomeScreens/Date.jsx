import React from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';
import CustomCalendar from './CustomCalendar';

import { useDate } from './contexts/DateContext';

export default function DateD({ navigation }) {

    const { applyPeriod } = useDate();

    return (
        <>
            <View style={styles.bigContainer}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '700',
                        color: '#FFF',
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >Date</Text>
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
            <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
                <View style={{ width: 340 }}>
                    <CustomCalendar search={true} />
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', width: 340 }}>
                    <Button 
                        title='Apply'
                        containerStyle={{
                            width: '100%'
                        }}
                        buttonStyle={{
                            backgroundColor: Global.buttonbg1,
                            width: '100%',
                            borderRadius: 100,
                            marginBottom: 30,
                            alignSelf: 'center'
                        }}
                        onPress={() => {
                            applyPeriod();
                            navigation.push('homeMain');
                        }}
                    />
                </View>
            </View>
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
    container: {
        flex: 1,
        width: 350,
        alignItems: 'center'
    }
})
