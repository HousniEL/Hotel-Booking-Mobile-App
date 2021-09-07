import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomSelect({ data, additionStyle, defaultValue, handle }) {

    return (
        <SelectDropdown 
            data={data}
            defaultValue={defaultValue}
            onSelect={(selectedItem, index) => {
                handle(selectedItem)
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
            renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.roomsDropdownBtnContainer}>
                    <Text style={styles.roomsDropdownBtnTxt}>
                      {selectedItem ? selectedItem.type || selectedItem : "Select an option"}
                    </Text>
                    {selectedItem && selectedItem.price && (
                      <Text style={{ color: '#444' }}>{ '$ ' + selectedItem.price }</Text>
                    )}
                  </View>
                );
            }}
            renderCustomizedRowChild={(item, index) => {
                return (
                    <View style={styles.roomsDropdowndropContainer}>
                        <Text style={{ fontSize: 15 }}>{item.type || item}</Text>
                        {
                            item.price && (
                                <Text style={{ fontSize: 12 }}>{ '$ ' + item.price}</Text>
                            )
                        }
                    </View>
                );
            }}
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
        height: 42
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
    roomsDropdownBtnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roomsDropdownBtnTxt: {
        fontSize: 16,
        color: '#555'
    },
    roomsDropdowndropContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
