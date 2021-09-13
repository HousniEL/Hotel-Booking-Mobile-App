import React from 'react';

import { 
    StyleSheet, 
    Text,
    Image
} from 'react-native';

import Gif from '../../assets/success.gif';

import { Overlay, Button } from 'react-native-elements';
import Global from '../Global';

export default function Success({ success, setSuccess, navigation }) {

    function handleOk(){
        navigation.popToTop();
        setSuccess(false);
    }

    return (
        <Overlay isVisible={success} overlayStyle={{ width: '90%', maxWidth: 400 }}>
            <Image 
                source={Gif}
                style={{ width: 60, height: 60, alignSelf: 'center', marginBottom: 5 }}
            />
            <Text style={{ margin: 10, fontSize: 18, textAlign: 'center' }}>
                Your reservation was sent to the hotel to check it and see if it's valid.
            </Text>
            <Text style={{ margin: 10, fontSize: 18, textAlign: 'center' }}>
                To check your reservation status, open the drawer and select 'Reservations'
            </Text>
            <Button 
                title='Ok'
                containerStyle={{ width: 150, alignSelf: 'center'  }}
                buttonStyle={{ width: 150, backgroundColor: 'transparent' }}
                titleStyle={{ color: Global.secondary, fontSize: 18 }}
                onPress={handleOk}
            />
        </Overlay>
    )
}

const styles = StyleSheet.create({})
