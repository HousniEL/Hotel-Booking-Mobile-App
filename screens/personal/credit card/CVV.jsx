import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements'; 

import { cvvValidation } from '../../../functions/ccValidation';

export default function CVV({ setCvvValue, required, setErr }) {

    const [ cvv, setCvv ] = useState();
    const [ error, setError ] = useState();
    const [ success, setSuccess ] = useState();

    function handleChanges(event){
        var value = event.nativeEvent.text;
        if(value.length <= 3){
            setCvv(value);
            setCvvValue(value);
            var err = cvvValidation(value);
            setError(err);
            setErr(err);
            if(value.length === 3){
                setSuccess(!err);
            } else {
                setSuccess();
            }
        }
    }
    return (
        <Input 
            value={cvv}
            placeholder='123'
            keyboardType={'number-pad'}
            textContentType={'none'}
            inputContainerStyle={[
                styles.inputcontainerstyle, 
                ( error || required ) && { borderColor: 'tomato' }, 
                success && { borderColor: 'green' }
            ]}
            inputStyle= {styles.inputstyle}
            containerStyle={{
                paddingHorizontal: 0
            }}
            errorStyle={{ marginTop: 0, color: 'tomato' }}
            onChange={ event => handleChanges(event) }
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
