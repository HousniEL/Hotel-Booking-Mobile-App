import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    TouchableHighlight
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { cancellationNoshow, reservation } from './policies';

export default function HotelPolicies({ navigation, route }) {

    const { hotelName } = route.params;

    return (
        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container} >
                <TouchableHighlight
                    style={{ position: 'absolute', width: '100%', top: 7 }}
                    underlayColor={'transparent'}
                    onPress={() => { navigation.pop() }}
                >
                    <View style={{ width:35, height:35, padding: 5 }}>
                        <MaterialCommunityIcons 
                            name={"arrow-left"} 
                            color={"#222"}
                            size={25}
                        />
                    </View>
                </TouchableHighlight>
                <Text style={ styles.hotelNameStyle }>
                    { hotelName }
                </Text>
                <View>
                   <Text style={ styles.policy }>Reservation Policy</Text>
                   <Text style={ styles.policyDetail }>
                        { reservation }
                   </Text>
                </View>
                <View>
                   <Text style={ styles.policy }>Cancellation/No-Show Policy</Text>
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
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: 25,
        color: "#444",
        textDecorationLine: 'underline',
        fontWeight: '700'
    },
    policy: {
        fontSize: 18,
        color: "#555",
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 10
    },
    policyDetail: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22
    }
})
