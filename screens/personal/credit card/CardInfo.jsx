import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { Button, Overlay } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CreditCardService from '../../../services/CreditCardService';
import CreditCardCover from '../../CreditCardCover';

import Global from '../../Global.js';

import { Flow } from "react-native-animated-spinkit";

export default function CardInfo({ userID, cardInfo, setRefresh, refresh }){

    const [wait, setWait] = useState(false); 
    const [deleting, setDeleting] = useState(false);

    function handleDelete(){
        setWait(false);
        setDeleting(true);
        const creditCardService = new CreditCardService();
        creditCardService.deleteCreditCard({ 'user_id' : userID }, (res) => {
            setRefresh(!refresh);
        }, (err) => {
            setDeleting(false);
        })
    }

    return (
        <View style={{ alignItems: 'center' }}>
            {
                !deleting ? (
                    <>
                        <CreditCardCover cardInfo={cardInfo} />
                        <TouchableHighlight 
                            underlayColor={'transparent'}
                            style={{ position: 'absolute', top: -45, right: 0  }}
                            onPress={() => setWait(true)}
                        >
                            <MaterialCommunityIcons name={'trash-can-outline'} color={'gray'} size={25} />
                        </TouchableHighlight>
                        <Overlay isVisible={wait} overlayStyle={ styles.overlay } >
                            <Text style={ styles.title }>
                            Verification Required
                            </Text>
                            <Text style={{ margin: 10, fontSize: 18, color: '#444', textAlign: 'center' }}>
                                Are you sure you want to delete this credit card?
                            </Text>
                            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: 20 }}>
                                <Button 
                                    title='Cancel'
                                    containerStyle={{ width: "50%", alignSelf: 'center' , borderRadius: 0   }}
                                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, borderEndColor: '#ddd', borderRightWidth: 1, backgroundColor: 'transparent', borderRadius: 0 }}
                                    titleStyle={{ color: Global.tabactive, fontSize: 18 }}
                                    onPress={() => { setWait(false) }}
                                />
                                <Button 
                                    title='Delete'
                                    containerStyle={{ width: "50%", alignSelf: 'center', borderRadius: 0   }}
                                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, backgroundColor: 'transparent', borderRadius: 0  }}
                                    titleStyle={{ color: 'tomato', fontSize: 18 }}
                                    onPress={handleDelete}
                                />
                            </View>
                        </Overlay>
                    </>
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <Flow color='#666' size={30} />
                    </View>
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    overlay: {
        width: '90%', 
        maxWidth: 400, 
        padding: 0, 
        borderRadius: 5 
    },
    title: {
        margin: 10, 
        fontSize: 20, 
        color: '#444', 
        fontWeight: '700', 
        textAlign: 'center'
    }
})