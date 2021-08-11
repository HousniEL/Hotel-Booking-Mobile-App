import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default function LogoSide() {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('./assets/Images/logo-red.png')}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Hotels
                </Text>
                <Text style={styles.title}>
                    Reservation
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 80
    },
    image: {
        width: 50,
        height: 50
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50
    },
    title: {
        fontSize: 21,
        fontWeight: "700",
        color: "gray",
        borderColor: 'black',
        marginLeft: 5
    }
})
