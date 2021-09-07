import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import CountryPicker from 'react-native-country-picker-modal';

export default function SelectCountry({ setCountryValue, required, setErr }) {

    const [ country, setCountry ] = useState();

    const [ show, setShow ] = useState(false);

    const onSelect = (country) => {
        setCountry(country.name);
        setCountryValue(country.name);
        setErr();
    }

    return (
        <>
            <CountryPicker
                subregion={'Northern Africa'}
                withFlag={false}
                withFilter={true}
                containerButtonStyle={{ display: 'none' }}
                onSelect={onSelect}
                onClose={() => setShow(false)}
                visible={show}
            />
            <TouchableWithoutFeedback onPress={ () => setShow(true) }>    
                <Text style={[
                    styles.inputcontainerstyle, 
                    country && { borderColor: 'green' },
                    required && { borderColor: 'tomato' }
                ]}>
                    { country ? country : "Select Country" }
                </Text>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    inputcontainerstyle: {
        backgroundColor: "white",
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        height: 45,
        textAlignVertical: 'center',
        fontSize: 15,
        paddingHorizontal: 5,
        marginBottom: 20,
        color: '#555'
    }
})
