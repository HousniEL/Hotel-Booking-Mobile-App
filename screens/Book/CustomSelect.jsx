import React from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomSelect({ type, data, additionStyle, defaultValue, handle }) {

    return (
        <SelectDropdown 
            data={data}
            defaultValue={defaultValue}
            onSelect={(selectedItem, index) => {
                if(type === "adult" || type === "children") {
                    handle(selectedItem)
                }
            }}
            buttonTextAfterSelection={(selectedItem) => {
                return selectedItem
            }}
            buttonStyle={[styles.dropdown1BtnStyle, additionStyle && additionStyle.btn]}
            buttonTextStyle={[styles.dropdown1BtnTxtStyle, additionStyle && additionStyle.btnTxt]}
            renderDropdownIcon={() => {
                return (
                    <MaterialCommunityIcons name="chevron-down" color={"#444"} size={16}     
                        style={{ marginRight: 3 }}
                    />
                );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: 55,
        height: 30,
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 0,
        borderColor: "#BBB"
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontSize: 16 },
    dropdown1DropdownStyle: { 
        backgroundColor: "#EFEFEF",
        borderRadius: 3,
        marginTop: -24
    },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#DCDCDC",
        height: 40
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" }
})
