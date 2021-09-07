import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Input } from 'react-native-elements';

import { 
    ccFirstNum,
    visaValidation,
    mastercardValidation
} from '../../../functions/ccValidation';

import FontAwsome from 'react-native-vector-icons/FontAwesome';

export default function CCNumber({ setCreditNum, required, setErr }) {

    const [ cardType, setCardType ] = useState();
    const [ cardNum, setCardNumber ] = useState();
    const [ error, setError ] = useState();
    const [ success, setSuccess ] = useState();

    function handleChanges(value){
        setSuccess();
        var valueWithoutSpace = value.replace(/ /g, '');
        if( ( !cardNum || value.length >= cardNum.length ) && valueWithoutSpace.length < 16 ){
            setCreditNum(valueWithoutSpace);
            setCardNumber(value);
            if( value.length === 1 ){
                var cardT = ccFirstNum(value);
                if(cardT !== 'undefined'){
                    setCardType(cardT);
                    setError();
                    setErr();
                } else {
                    setCardType();
                    setError('Unsupported credit card.');
                    setErr(" ");
                }
            }
            if( value.length%5 === 0 ){
                var copy = "";
                for(let i = 0; i < value.length; i++) {
                    if(i !== value.length - 1){
                        copy += value[i];
                    } else copy += ' ' + value[i];
                }
                setCardNumber(copy);
            }
        } else {
            setCardNumber(value);
        }
        if( value.length === 0 ){
            setCardType();
            setError();
            setErr();
        }
        if(valueWithoutSpace.length >= 13 && valueWithoutSpace.length <= 16 && cardType === "visa" ){
            checkVisa(valueWithoutSpace);
        }
        if(valueWithoutSpace.length === 16 && cardType === "mastercard" ){
            checkMastercard(valueWithoutSpace);
        }
        if(valueWithoutSpace.length > 16 && cardType){
            setError("Card Number surpass 16-digit.");
            setErr(" ");
        }
    }

    function checkVisa(value){
        if(visaValidation(value) === ""){
            setErr();
            setError();
            setSuccess(' ');
        } else {
            setError(' ');
            setErr(' ');
        }
    }
    function checkMastercard(value){
        if(mastercardValidation(value) === ""){
            setSuccess(' ');
            setError();
            setErr();
        } else {
            setError(' ');
            setErr(' ');
        }
    }

    return (
        <Input
            value={cardNum}
            placeholder='4444 5555 6666 7777'
            keyboardType={'numeric'}
            textContentType={'creditCardNumber'}
            inputContainerStyle={[
                styles.inputcontainerstyle, 
                (error || required ) && { borderColor: 'tomato' }, 
                success && { borderColor: 'green' }
            ]}
            inputStyle= {styles.inputstyle}
            containerStyle={{
                paddingHorizontal: 0
            }}
            onChangeText={ value => handleChanges(value) }
            rightIcon={ cardType && (
                <FontAwsome name={'cc-' + cardType} size={22} color='black' />
            ) }
            rightIconContainerStyle={{ marginRight: 5 }}
            errorMessage={error}
            errorStyle={{ marginTop: 0, color: 'tomato' }}
        />
    )
}

const styles = StyleSheet.create({
    inputcontainerstyle: {
        backgroundColor: "white",
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        height: 42,
        paddingVertical: 18
    },
    inputstyle : {
        fontSize: 15,
        paddingHorizontal: 5,
        paddingTop: 0,
        height: 42,
        color: 'black'
    }
})
