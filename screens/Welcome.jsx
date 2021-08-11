import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import global from './Global';

import { LinearProgress } from 'react-native-elements';

export default function Welcome() {
    return (
        <View style={{backgroundColor: global.primary, flex:1}}>
            <Text style={[styles.logo, {marginTop: 125}]}>
                Hotels
            </Text>
            <Text style={styles.logo}>
                Reservation
            </Text>
            <View style={{
                width: useDimensions().screen.width,
                alignItems: 'center',
                position: 'absolute',
                bottom: 20,
                marginBottom: 125
            }}>
                <LinearProgress 
                    color={global.secondary}
                    trackColor={"white"}
                    style={{
                        width: 150
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '700',
        color: 'white'
    }
})