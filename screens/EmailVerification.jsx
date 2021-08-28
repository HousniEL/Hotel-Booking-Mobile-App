import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions,
    Keyboard
} from 'react-native';

import { Input } from 'react-native-elements';

import { CircleFade } from 'react-native-animated-spinkit';

export default function EmailVerification() {

    var refrenceCode = '123456'; 

    const [ code, setCode ] = useState('');
    const [ codeUnder, setCodeUnder ] = useState('______');
    const [ message, setMessage ] = useState();

    const [ wait, setWait ] = useState(false);

    function handleChange(value){
        setMessage();
        if(value.length <= 6){
            setCode(value)
            if(value.length === 6){
                Keyboard.dismiss();
                setWait(true);
                setTimeout(() => { check(value) }, 3000);
            }
            if(value.length === 0) setCode('');
        }
    }

    function check(value){
        if(value === refrenceCode){
            
        } else {
            setCode('');
            setCodeUnder('______');
            setMessage('Incorrect code');
        }
        setWait(false);
    }

    function handleFocus(){
        var codeUnderCpy = codeUnder.replace(/\_?/g, '');
        setCodeUnder(codeUnderCpy);
    }
    function handleBlur(){
        var codeUnderCopy = '';
        if(code.length !== 0){
            for(let i = 0; i < 6 - code.length; i++){
                codeUnderCopy += '_';
            }
            setCodeUnder(codeUnderCopy);
        } else setCodeUnder('______');
    }
    
    return (
    <>
        <View style={ styles.container }>
            <View style={styles.logoContainer}>
                <Image 
                    style={styles.image}
                    source={require('../assets/Images/logo-green.png')}
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
            <Text style={styles.message}>
                To use your account you should first validate it.
            </Text>
            <Text style={styles.message}>
                Go check your inbox for a validation code.
            </Text>
            <Input 
                value={code + codeUnder}
                keyboardType={"numeric"}
                autoCorrect={false}
                containerStyle={{
                    paddingHorizontal: 0,
                    width: 150,
                }}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputcontainer}
                errorStyle={{ display: 'none' }}
                onFocus={ handleFocus }
                onBlur={ handleBlur }
                onChangeText={ value => handleChange(value) }
            />
            {
                message && (
                    <Text style={ styles.messageError }>
                        { message }
                    </Text>
                )
            }
        </View>
        {
            wait && (
                <View style={{
                    width: '100%',
                    height: Dimensions.get('screen').height,
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CircleFade size={50} color="#FFF" />
                </View>
            )
        }
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '20%',
        width: '90%',
        maxWidth: 400,
        alignSelf: 'center'
    },
    message:{
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20
    },
    inputcontainer: {
        borderColor: 'transparent',
        padding: 10,
        height: 52,
        borderRadius: 25
    },
    input: {
        color: '#777',
        marginLeft: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
        letterSpacing: 5
    },
    logoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20%'
    },
    image: {
        width: 40,
        height: 40
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#666",
        borderColor: 'black',
        marginLeft: 10
    },
    messageError: {
        marginTop: 15,
        fontSize: 18,
        width: '50%',
        color: '#B82424',
        padding: 10,
        textAlign: 'center'
    }
})
