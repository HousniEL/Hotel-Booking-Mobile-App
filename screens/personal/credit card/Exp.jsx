import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements'; 

import { expValidation } from '../../../functions/ccValidation';

export default function Exp({ setExpValue, required, setErr }) {
    
    const [ exp, setExp ] = useState();
    const [ error, setError ] = useState();
    const [ success, setSuccess ] = useState();

    function handleChanges(value){
        setSuccess();
        setError();
        setErr();
        if( value.length <= 5 ){
            if( !exp || value.length >= exp.length ){
                if(value.length == 2){
                    setExp(value + '/');
                    setExpValue(value + '/');
                } else {
                    setExp(value);
                    setExpValue(value);
                }
            } else {
                setExp(value);
            }
            if(value.length == 5){
                var err = expValidation(value);
                setError(err);
                setErr(' ')
                setSuccess(!err);
                if(!err){
                    checkDate(value);
                }
            }
        }
    }

    function checkDate(value){
        var tab = value.split('/');
        var expDate = new Date(Date.UTC(2000 + Number(tab[1]), Number(tab[0]) - 1));
        (new Date() > expDate) ? (
            setError(' '),
            setErr(' '),
            setSuccess()
        ) : (
            setError(),
            setErr(),
            setSuccess(' ')
        )
    }

    return (
        <Input 
            value={exp}
            placeholder='MM/YY'
            keyboardType={'numeric'}
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
            onChangeText={ value => handleChanges(value) }
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
