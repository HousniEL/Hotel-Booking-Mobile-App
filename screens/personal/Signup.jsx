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

export default function Signup({ navigation }) {

    const [pinSecure, setPinSecure] = useState(true);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();
    const [pwdConfirmation, setPwdConfirmation] = useState();

    function handleSubmit(){
        
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../../assets/Images/logo-white.png')}
            />
            <Text style={styles.title} >
                Create An Account
            </Text>
            <View style={{ alignItems: 'center' }}>
                <InputSample 
                    ph={'Username'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'} fct={setUsername}
                />
                <InputSample 
                    ph={'Email'} kT={'email-address'} aCT={'email'} tCT={'emailAddress'} iconName={'email'} fct={setEmail}
                />
                <Input
                    placeholder={"Password"}
                    keyboardType={"default"}
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="account-key" size={20} color={"#CCC"} />
                    }
                    rightIcon={
                        <PasswordEyeIcon pinSecure={pinSecure} setPinSecure={setPinSecure} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: 320,
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    secureTextEntry={pinSecure}
                    onChangeText={(password) => setPwd(password)}
                />
                <Input
                    placeholder={"Password Confirmation"}
                    keyboardType={"default"}
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="account-key" size={20} color={"#CCC"} />
                    }
                    rightIcon={
                        <PasswordEyeIcon pinSecure={pinSecure} setPinSecure={setPinSecure} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: 320,
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    onChangeText={(passwordConfirmation) => setPwdConfirmation(passwordConfirmation)}
                />
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Button 
                        title='SIGN UP'
                        buttonStyle={styles.buttonstyle}
                        titleStyle={{
                            fontSize: 14
                        }}
                        onPress={handleSubmit}
                    />
                    <BottomSign navigation={navigation} />
                </View>
            </View>
        </View>
    )
}

function InputSample({ ph, kT, aCT, tCT, iconName, fct }){
    return (
        <Input 
            placeholder={ph}
            keyboardType={kT}
            autoCompleteType={aCT}
            textContentType={tCT}
            autoCorrect={false}
            leftIcon={
                <MaterialCommunityIcons name={iconName} size={20} color={"#CCC"} />
            }
            leftIconContainerStyle={{
                width: 30
            }}
            containerStyle={{
                paddingHorizontal: 0,
                width: 320,
            }}
            inputStyle={styles.input}
            placeholderTextColor={"#CCC"}
            inputContainerStyle={styles.inputcontainer}
            onChangeText={(username) => fct(username)}
        />
    )
}

function BottomSign({ navigation }){
    return (
        <>
            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
            <Text
            style={{
                color: 'white',
                borderColor: "black"
            }}
            >
                Already have an account? {' '}
            </Text>
            <TouchableHighlight
                onPress={() => {
                    navigation.pop();
                }}
                underlayColor={'transparent'}
            >
                <Text style={{
                    color: Global.primary
                }}>Log In</Text>                  
            </TouchableHighlight>
            </View>
        </>
    )
}

function PasswordEyeIcon({ pinSecure, setPinSecure }){

    return (
        <TouchableHighlight
            style={{ padding: 4 }}
            onPress={ () => {
                setPinSecure(!pinSecure)
            } }
            underlayColor={'transparent'}
        >
            {
                (pinSecure === true)? (
                    <MaterialCommunityIcons
                        name='eye'
                        color={"#CCC"}
                        size={20}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name='eye-off'
                        color={"#CCC"}
                        size={20}
                    />
                )
            }
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Global.bg1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        marginBottom: 40
    },
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        height: 52,
        borderRadius: 25
    },
    input: {
        color: '#CCC',
        marginLeft: 2,
        fontSize: 16
    },
    buttonstyle: {
        width: 320,
        height: 45,
        borderRadius: 20,
        backgroundColor: Global.buttonbg1
    }
})
