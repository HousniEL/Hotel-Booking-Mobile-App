import React, { useState, useEffect } from 'react';

import { 
    StyleSheet, 
    View, 
    Alert
} from 'react-native';

import { Input, Button } from 'react-native-elements';

import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { fetchPublishableKey } from '../../helpers';
import { API_URL } from '../../Config';

export default function StripePayment() {

    const [publishableKey, setPublishableKey] = useState('pk_live_51JP7grHTMmGTbtWMtmznfYQZvdI7djBIyBSig8EYLxREi3MF36IsDvSdk9cdubpIawu48HsfuOTbzCwgucFY84Kl00cBtxZSvO');

    /*useEffect(() => {
        async function init(){
            fetchPublishableKey((key) => {
                setPublishableKey(key);
            });
        }
        init();
    }, []);*/

    return (
        <StripeProvider publishableKey={'pk_live_51JP7grHTMmGTbtWMtmznfYQZvdI7djBIyBSig8EYLxREi3MF36IsDvSdk9cdubpIawu48HsfuOTbzCwgucFY84Kl00cBtxZSvO'} >
            <StripeContent />
        </StripeProvider>
    )
   
}

function StripeContent(){

    const [ name, setName ] = useState('');
    const [ cardD, setCardD ] = useState();

    const { confirmPayment, loading } = useConfirmPayment();

    handlePayment = async () => {

        if( !cardD.complete || !name ){
            Alert.alert('Warning', 'Please enter all the info');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    parameters: {
                        amount: 2000,
                        payment_method_types: ['card'],
                        currency: 'usd'
                    }
                })
            });
            const { clientsecret } = await response.json();

            const { error, paymentIntent } = await confirmPayment(clientsecret, {
                type: 'Card',
                billingDetails: {name}
            });

            if(error){
                Alert.alert("Erreur " + error.code, error.message);
            } else if(paymentIntent) {
                Alert.alert("Success", paymentIntent.id);
            }

        } catch (error) {
            
        }
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder='Name'
                keyboardType='name-phone-pad'
                autoCapitalize='none'
                onChange={ e => setName(e.nativeEvent.text) }
            />
            <CardField
                postalCodeEnabled={false}
                onCardChange={(cardDetails) => {
                console.log('card details', cardDetails);
                }}
                style={{height: 50}}
            />
            <Button 
                title='Pay'
                onPress={handlePayment}
                disabled={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    cardField: {
        height: 50,
        marginVertical: 30
    }
})
