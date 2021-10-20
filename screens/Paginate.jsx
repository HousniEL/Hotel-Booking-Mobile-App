import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Global from './Global'

export default function Paginate({ allIds, fetchIds, setItems, perpage }) {

    const [ activePage, setActivePage ] = React.useState(1);

    var numberOfPages = [];

    for( let i = 1; i <= Math.ceil(allIds.length / perpage); i++ ){
        numberOfPages.push(i);
    }

    function liPressed(pageNumber){
        setItems();
        fetchIds({ ids : allIds.slice((pageNumber - 1) * perpage, pageNumber * perpage) }, (suc) => {
            setItems(suc);
            setActivePage(pageNumber);
        }, (err) => {
            console.log(err);
        });
    }

    return (
        <View style={ styles.ul }>
            {
                numberOfPages.map( (val, idx) => (
                    <TouchableHighlight key={idx} onPress={() => liPressed(val)} underlayColor={'transparent'}>
                        <Text style={ activePage == val ? styles.activeli : styles.li }>
                            { val }
                        </Text>
                    </TouchableHighlight>
                ) )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    ul: {
        marginVertical: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    li: {
        width: 32,
        height: 32,
        color: Global.primary,
        textAlign: "center",
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: Global.primary,
        borderRadius: 100,
        margin: 2,
        fontSize: 18
    },
    activeli: {
        width: 32,
        height: 32,
        color: 'white',
        textAlign: "center",
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: Global.primary,
        borderRadius: 100,
        margin: 2,
        backgroundColor: Global.primary,
        fontSize: 18
    }
})
