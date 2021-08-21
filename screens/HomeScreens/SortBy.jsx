import React from 'react';

import { StyleSheet, TouchableHighlight } from 'react-native'; 

import MaterialComunnityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Overlay, Button, CheckBox } from 'react-native-elements';
import Global from '../Global';
import { useSort } from './contexts/SortByContext';


const sortOptions = [
    "Default sorting",
    "Sort by price: low to high",
    "Sort by price: high to low",
    "Sort by oldest to newest"
]

export default function SortByMain({ handleApply }) {

    const { sort, visibleList, toggleOverlay } = useSort();

    /*function handleItemPressed(value){
        updateSort(value);
        toggleOverlay();
    }*/

    return (
        <>
            <TouchableHighlight 
                underlayColor={'transparent'}
                style={{width: '50%'}}
            >
                <Button 
                    title='SORT BY'
                    buttonStyle={styles.buttonstyle}
                    icon={
                        <MaterialComunnityIcons name={'sort'} color={Global.buttonbg1} size={20} />
                    }
                    titleStyle={styles.buttontitlestyle}
                    onPress={toggleOverlay}
                />  
            </TouchableHighlight>
            <Overlay isVisible={visibleList} onBackdropPress={toggleOverlay} onPress={toggleOverlay}>
                {
                    sortOptions.map( (value, idx) => (
                        <TouchableHighlight 
                            underlayColor={'transparent'}
                            key={idx.toString()}
                            style={{
                                width: 250
                            }}
                        >
                            <CheckBox
                                title={value}
                                checkedIcon='dot-circle-o'
                                checkedColor={Global.primary}
                                uncheckedIcon='circle-o'
                                containerStyle={styles.radioContainer}
                                checked={value === sort}
                                textStyle= {styles.radioText}
                                size={20}
                                onPress={() => handleApply(value)}
                            />
                        </TouchableHighlight>
                    ) )
                }
            </Overlay>
        </>
    )

}


const styles = StyleSheet.create({
    radioContainer: {
        padding: 0,
        paddingVertical: 8,
        backgroundColor: 'white',
        marginLeft: 0,
        width: '100%',
        borderColor: 'transparent',
        justifyContent: 'center'
    },
    radioText : {
        color: '#777',
        fontSize: 16,
        paddingBottom: 1
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    buttontitlestyle: {
        color: Global.buttonbg1, 
        marginLeft: 6, 
        fontSize: 14
    }
})