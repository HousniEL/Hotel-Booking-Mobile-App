import React, { useState } from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Input, Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import { Flow } from 'react-native-animated-spinkit';

import UserService from '../../services/UserService';
import { emailValidation } from '../../functions/inputValidation';

export default function ForgotPassword({ navigation, route }) {

    const { insertedValue } = route.params;

    const [ email, setEmail ] = useState(insertedValue && insertedValue);
    const [ error, setError ] = useState();
    const [ message, setMessage ] = useState();
    const [ loading, setLoading ] = useState(false);

    function handleEmail(value){
        setEmail(value);
    }

    function handleSubmit(){
        setError();
        setMessage();
        setLoading(true);
        const userService = new UserService();
        var validation = emailValidation(email);
        if(validation === "") {
            userService.sendResetRequest({ email }, () => {
                setMessage('Check your email inbox.');
                setLoading(false);
            }, (err) => {
                setError(err.message);
                setLoading(false);
            });
        } else {
            setError(validation);
            setLoading(false);
        }
    }

    return (
       <>
       <View style={styles.container}>
            <TouchableHighlight style={styles.arrowStyle} underlayColor={'transparent'} onPress={() => navigation.pop()} >
                <MaterialCommunityIcons name='arrow-left' color={'white'} size={24}
                    style={{
                        padding: 0,
                        width: 24,
                        height: 24
                    }}
                />
            </TouchableHighlight>
            <Image 
                style={styles.image}
                source={require('../../assets/Images/logo-white.png')}
            />
            <Text style={styles.title} >
                Reset your password
            </Text>
            { error && (
                <View style={ styles.errorContainerStyle }>
                    <Text style={ styles.errorStyle }>{ error }</Text>
                </View>
            ) }
            { message && (
                <View style={ styles.successContainerStyle }>
                    <Text style={ styles.successStyle }>{ message }</Text>
                </View>
            ) }
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Input
                    value={email}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    autoCompleteType={'email'}
                    textContentType={'emailAddress'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="email" size={20} color={"#CCC"} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: '90%',
                        maxWidth: 400,
                        minWidth: 320,
                        height: 70
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    onChangeText={handleEmail}
                />
                <Button 
                    title='RESET'
                    containerStyle={[ styles.buttonstyle, { width: '90%', maxWidth: 400 } ]}
                    buttonStyle={styles.buttonstyle}
                    titleStyle={loading ? { display: 'none' } : { fontSize: 14 }}
                    icon={ loading && <Flow size={30} color='white' /> }
                    disabled={loading}
                    iconContainerStyle={!loading ? { display: 'none' } : null}
                    onPress={handleSubmit}
                    disabledStyle={{ backgroundColor: "#899B9A" }}
                />
            </View>
        </View>
        </> 
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height: '100%',
        padding: 10,
        backgroundColor: Global.primary
    },
    arrowStyle: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: '50%'
    },
    image: {
        width: 45,
        height: 45,
        alignSelf: 'center',
        marginBottom: 5
    },
    title: {
        alignSelf: 'center',
        fontSize: 23,
        color: 'white',
        marginBottom: 15
    },
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        height: 52,
        borderRadius: 5,
    },
    input: {
        color: '#CCC',
        marginLeft: 2,
        fontSize: 16
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        borderRadius: 5,
        backgroundColor: Global.buttonbg1
    },
    errorContainerStyle: {
        backgroundColor: '#FFB3A2',
        marginTop: 0,
        alignSelf: 'center',
        marginBottom: 8,
        padding: 15,
        width: '90%',
        maxWidth: 400,
        minWidth: 320,
        borderRadius: 5
    },
    errorStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D23C1A',
    },
    successContainerStyle: {
        backgroundColor: '#fff',
        marginTop: 0,
        alignSelf: 'center',
        marginBottom: 8,
        padding: 15,
        width: '90%',
        maxWidth: 400,
        minWidth: 320,
        borderRadius: 5
    },
    successStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A5157',
    },
})
