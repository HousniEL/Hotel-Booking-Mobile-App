import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    TouchableHighlight
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { cancellationNoshow } from '../HotelAd/policies';

export default function CancellationPolicy({ navigation, route }) {

    const { hotelName } = route.params;

    return (
        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container} >
                <TouchableHighlight
                    style={{ position: 'absolute', width: '100%', top: 7 }}
                    underlayColor={'transparent'}
                    onPress={() => { navigation.pop() }}
                >
                    <View style={{ width: 35, height: 35, padding: 5 }}>
                        <MaterialCommunityIcons 
                            name={"arrow-left"} 
                            color={"#222"}
                            size={25}
                        />
                    </View>
                </TouchableHighlight>
                <Text style={ styles.hotelNameStyle }>
                    { hotelName + '\n'}
                </Text>
                <Text style={ styles.policy }>Cancellation/No-Show Policy</Text>
                <View>
                   <Text style={ styles.policyDetail }>
                        { cancellationNoshow }
                   </Text>
                </View>
            </View>
        </ScrollView> 
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10, width: '100%', height: '100%', maxWidth: 470, paddingHorizontal: 10, backgroundColor: 'white'
    },
    hotelNameStyle: {
        marginTop: '10%',
        marginBottom: 0,
        textAlign: 'center',
        fontSize: 25,
        height: 30,
        color: "#444",
        textDecorationLine: 'underline',
        fontWeight: '700'
    },
    policy: {
        fontSize: 19,
        color: "#555",
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 30,
        textDecorationLine: 'none'
    },
    policyDetail: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22
    }
})
