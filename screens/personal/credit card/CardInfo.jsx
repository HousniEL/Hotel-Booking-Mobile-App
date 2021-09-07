import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Button, Overlay } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CreditCardService from '../../../services/CreditCardService';
import CreditCardCover from '../../CreditCardCover';
import Global from '../../Global';

export default function CardInfo({ userID, cardInfo, setRefresh, refresh }){

    const [wait, setWait] = useState(false); 
    const [ messageVisibility, setMessageVisibility ] = useState(false);

    function toggleOverlay(){
        setMessageVisibility(!messageVisibility);
    }

    function handleCancel(){
        toggleOverlay();
    }


    function handleDelete(){
        setWait(true);
        const creditCardService = new CreditCardService();
        creditCardService.deleteCreditCard({ 'user_id' : userID }, (res) => {
            console.log('Res : ', res);
            toggleOverlay();
            setWait(false);
            setRefresh(!refresh);
        }, (err) => {
            console.log('Err : ', err);
            toggleOverlay();
            setWait(false);
        })
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <CreditCardCover cardInfo={cardInfo} />
            <Button 
                title={'Delete'}
                containerStyle={{ marginTop: 15 }}
                buttonStyle={{ backgroundColor: '#DA4C55', paddingHorizontal: 20 }}
                onPress={toggleOverlay}
            />
            <Overlay 
                isVisible={messageVisibility} 
                onBackdropPress={toggleOverlay} 
                onPress={toggleOverlay} 
                overlayStyle={styles.overlay}
            >
                <View style={ { backgroundColor: 'white', borderRadius: 10 } }>
                    <Text style={styles.title}>Are you sure you want to delete this credit card?</Text>
                    <Button 
                        title="Delete"
                        containerStyle={{
                            justifyContent: 'center'
                        }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            padding: 10
                        }}
                        titleStyle={{
                            color: '#DA4C55',
                            fontSize: 18,
                            fontWeight: '700'
                        }}
                        onPress={handleDelete}
                        disabled={wait}
                        disabledStyle={{ backgroundColor: 'transparent' }}
                        disabledTitleStyle={{ color: '#DA4C55' }}
                    />           
                </View>
                <View>
                    <Button 
                        title="Cancel"
                        containerStyle={{
                            justifyContent: 'center',
                            marginTop: 10,
                            borderRadius: 10
                        }}
                        buttonStyle={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 10
                        }}
                        titleStyle={{
                            color: '#2B77D1',
                            fontSize: 18,
                            fontWeight: '700'
                        }}
                        onPress={handleCancel}
                        disabled={wait}
                        disabledStyle={{ backgroundColor: 'transparent' }}
                        disabledTitleStyle={{ color: '#2B77D1' }}
                    />
                </View>
            </Overlay>
        </View>
    )
}


const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'transparent',
        elevation: 0, 
        width: '90%', 
        maxWidth: 400,
        borderRadius: 5,
        padding: 0,
        bottom: 20,
        position: 'absolute' 
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: '#797979',
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})