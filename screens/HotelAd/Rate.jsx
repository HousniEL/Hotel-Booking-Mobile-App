import React, { useEffect, useState } from 'react';
import { 
    StyleSheet, 
    Text,
} from 'react-native';

export default function Rate({ value }) {

    const [ colorRate, setColorRate ] = useState('#444');

    const rateColor = [
        { range: [4, 5], color: '#247508' },
        { range: [3, 4], color: '#39AF10' },
        { range: [2, 3], color: '#D76617' },
        { range: [1, 2], color: '#D91B1B' },
    ]

    useEffect(() => {
        for(let rateRange of rateColor){
            if( value >= rateRange.range[0] &&  value <= rateRange.range[1] ){
                setColorRate(rateRange.color);
            }
        }
    }, []);

    return (
        <Text
            style={[styles.text, { backgroundColor: colorRate } ]}
        >
            {Number(value)}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 13,
        fontWeight: '700',
        color: 'white'
    }
})
