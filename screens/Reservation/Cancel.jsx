import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';

import { Button } from 'react-native-elements';

import BookingService from '../../services/BookingService';

import Verifying from './Verifying';

import { Flow } from 'react-native-animated-spinkit';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../Global';
import { useAuth } from '../../contexts/AuthContext';

export default function Cancel({ navigation, route }) {

    const { hotelName, booking_id } = route.params;
    const { currentUser } = useAuth();

    const [ reason, setReason ] = React.useState();
    const [ cancel, setCancel ] = React.useState();
    const [ wait, setWait ] = React.useState(false);
    const [ error, setError ] = React.useState(false);

    function handleSubmit(){
        setError(false);
        if(reason && reason != ""){
            setWait(true),
            setCancel(true);
        } else {
            setError(true);
        }
    }

    function hanldeCancel(){
        const bookingService = new BookingService();
        const object = {
            user_id : currentUser.id,
            booking_id : booking_id,
            reason : reason
        }
        bookingService.cancelBooking(object, () => {
            navigation.pop();
        }, (err) => {
            console.log(err);
        });
    }


    return (
        <>
        <TouchableHighlight
            style={{ position: 'absolute', width: '100%', top: 7 }}
            underlayColor={'transparent'}
            onPress={() => { navigation.pop() }}
        >
            <View style={{ width: 35, height: 35, marginVertical: 5, marginLeft: 15 }}>
                <MaterialCommunityIcons 
                    name={"arrow-left"} 
                    color={"#222"}
                    size={25}
                />
            </View>
        </TouchableHighlight>
        <View style={styles.container}>
            <Text style={ styles.text }>In order to cancel your reservation, you should specify your reason :</Text>
            <TextInput 
                value={reason}
                placeholder={"Why?"}
                multiline={true}
                numberOfLines={18}
                onChangeText={ value => setReason(value) }
                style={[ styles.textarea, error ? { borderColor: 'tomato' } : null ]}
                selectionColor={'black'}
                textDecorationLine={"none"}
            />
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>    
                <Text style={{ color: 'tomato' }}>
                    * Check first the hotel's cancellation policy{ ' ' }
                </Text>
                <TouchableHighlight underlayColor={'transparent'}  onPress={() => navigation.push('cancellationpolicy', { hotelName })}>
                    <Text style={{ fontWeight: "700" , color: 'tomato', textDecorationLine: "underline" }}>
                        here
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={{ marginTop: 100, alignItems: 'center' }} >
                <Button 
                    title="Submit"
                    containerStyle={{ width: '45%', maxWidth: 355 }}
                    buttonStyle={{ backgroundColor: Global.tabactive, height: 40 }}
                    titleStyle={ wait ? { display: 'none' } : null}
                    icon={ wait && <Flow size={30} color='white' /> }
                    disabled={wait}
                    disabledStyle={{ backgroundColor: Global.tabactive }}
                    disabledTitleStyle={{ color: '#bbb' }}
                    onPress={handleSubmit}
                />
                {
                    cancel === true && <Verifying cancel={cancel} setWait={setWait} setCancel={setCancel} sendCancel={hanldeCancel} />
                }
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '90%', 
        maxWidth: 400,
        height: '100%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        marginTop: 60,
        marginBottom: 15
    },
    textarea: {
        borderColor: '#ccc',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        textDecorationLine: "none",
        textAlignVertical: 'top'
    }
});