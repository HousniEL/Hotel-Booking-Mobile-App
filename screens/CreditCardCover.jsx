import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Global from './Global';

import visa from "../assets/Images/visa.png";
import mastercard from "../assets/Images/mastercard.png";
import smartchip from "../assets/Images/smartchip.png";

export default function CreditCardCover({ cardInfo }) {

    const [ image, setImage ] = useState();
    const [ number, setNumber ] = useState('');

    useEffect(() => {
        var type = cardInfo.number[0];
        if(type === "4") setImage(<Image source={visa} resizeMethod={'auto'} resizeMode={'contain'} style={{ width: 65, height: 40}} />)
        if(type === "5") setImage(<Image source={mastercard} resizeMethod={'auto'} resizeMode={'contain'} style={{ width: 65, height: 40}} />);
        var numberCpy = "";
        for( let i = 0; i < cardInfo.number.length; i++) {
            if(i > 3){
                if( i%4 === 0){
                    numberCpy += "  *"
                } else numberCpy += "*"
            } else {
                numberCpy += cardInfo.number[i];
            }
        }
        setNumber(numberCpy);
    }, []);

    return (
        <>
        {
            image && (
                    <LinearGradient 
                        style={[ styles.cardCover, { flexGrow: 1, borderRadius: 10 } ]}
                        colors={[Global.secondary, Global.primary, Global.secondary, Global.primary]}
                        start={{ x:0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                    <View style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 25 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image source={smartchip} style={{ width: 35, height: 25 }} />
                            { image }
                        </View>
                        <View style={{ marginTop: '9%'}}>
                            <Text style={styles.number}>{ number }</Text>
                        </View>
                        <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <Text style={styles.title}>Card Holder</Text>
                                <Text style={styles.content}>{ cardInfo.name }</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Expires</Text>
                                <Text style={styles.content}>{ cardInfo.exp }</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>CVV</Text>
                                <Text style={styles.content}>{ cardInfo.cvv }</Text>
                            </View>
                        </View>
                    </View>
                    </LinearGradient>
            )
        }
        </>
    )
}

const styles = StyleSheet.create({
    cardCover: {
        width: '95%',
        maxWidth: 350,
        flexGrow: 1,
        borderRadius: 10,
        position: 'relative'
    },
    number: {
        color: 'white',
        fontSize: 23
    },
    title: {
        color: '#bbb',
        fontSize: 13
    },
    content: {
        color: 'white',
        fontSize: 15
    }
})
