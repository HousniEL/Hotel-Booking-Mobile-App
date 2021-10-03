import React from 'react';

import {
    View,
    Text,
    Image
} from 'react-native';

import Gif from '../../assets/success.gif';

import { Overlay, Button } from 'react-native-elements';
import Global from '../Global';

export function Success({ success, setSuccess, navigation }) {

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

export function Waiting({ wait, check, setCheck, handlePayment, setWait, type }){
    return (
        <Overlay isVisible={wait && !check} overlayStyle={{ width: '90%', maxWidth: 400, padding: 0, borderRadius: 5 }}>
            <Text style={{ margin: 10, fontSize: 20, color: '#444', fontWeight: '700', textAlign: 'center' }}>
                Verification Required
            </Text>
            <Text style={{ margin: 10, fontSize: 18, color: '#444', textAlign: 'center' }}>
                Before we go any further, you must tap "Continue" to confirm your decision.
            </Text>
            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: 20 }}>
                <Button 
                    title='Cancel'
                    containerStyle={{ width: "50%", alignSelf: 'center' , borderRadius: 0   }}
                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, borderEndColor: '#ddd', borderRightWidth: 1, backgroundColor: 'transparent', borderRadius: 0 }}
                    titleStyle={{ color: 'tomato', fontSize: 18 }}
                    onPress={() => { setCheck(); setWait(false);} }
                />
                <Button 
                    title='Continue'
                    containerStyle={{ width: "50%", alignSelf: 'center', borderRadius: 0   }}
                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, backgroundColor: 'transparent', borderRadius: 0  }}
                    titleStyle={{ color: Global.tabactive, fontSize: 18 }}
                    onPress={() => { setCheck(true); handlePayment(type); }}
                />
            </View>
        </Overlay>
    )
}
