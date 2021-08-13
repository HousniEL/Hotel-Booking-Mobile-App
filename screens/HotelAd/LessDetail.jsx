import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableHighlight,
    Image
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import servicesIcons from '../constants';

export default function LessDetail() {

    const [heartFilling, setHeartFilling] = useState(false);

    return (
        <View
            style={styles.container}
        >
            <View style={{ height: 130, alignItems: "center" }} >
                <Image
                    resizeMethod={'auto'}
                    resizeMode={'cover'} 
                    style={styles.imageStyle}
                    source={{ uri: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partnerimages/28/55/285581588.jpeg' }}
                />
                <TouchableHighlight
                    style={{ position: 'absolute', top: 5, right: 5 }}
                    underlayColor={'transparent'}
                    onPress={() => setHeartFilling(!heartFilling)}
                >
                    <View>
                        <MaterialCommunityIcons 
                            name={ (heartFilling === true) ? "heart" : "heart-outline"} 
                            color={ (heartFilling === true ) ? "tomato" : Global.black}
                            size={30}
                        />
                    </View>
                </TouchableHighlight>
            </View>
            <View
                style={{
                    padding: 5,
                    flex: 1
                }}
            >
                <Text style={{fontSize: 20, fontWeight: '700', paddingHorizontal: 2, color: Global.black}}>
                    Royal Atlas & Spa
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="map-marker" color={Global.black} size={12} style={{padding: 0}} />
                    <Text style={{ color: Global.black, fontSize: 13 }}>
                        Baie d'Agadir, Agadir
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 10,
                        right: 7
                    }}
                >
                    {
                        [1, 2, 3, 4].map((value) => (
                            <MaterialCommunityIcons
                                name='star'
                                color='gold'
                                size={16}
                                key={value.toString()}
                            />
                        ))
                    }
                </View>
                <Text style={styles.servicesContainer} numberOfLines={3} >
                    {
                        ['Free of charge cancellation', 'Wi-Fi', 'Restaurant', 'Parking', 'Swimming pool'].map( (value, idx) => (
                            <View key={idx.toString()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons 
                                    name={servicesIcons.get(value)} 
                                    color={'#666'} 
                                    size={(value === "Free of charge cancellation") ? 14 : 12} 
                                    style={{ padding: 0 }} 
                                    />
                                <Text style={{ color: '#666', fontSize: 14 }}>
                                    {' ' + value + '  '}
                                </Text>
                            </View>
                        ) )
                    }
                </Text>
                <View style={styles.priceContainer} >
                    <Text style={styles.priceHeader}>
                        Starting price per night
                    </Text>
                    <Text style={styles.price} >
                        200$
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 275,
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius:5,
        elevation: 5,
        position: 'relative',
        backgroundColor: 'white'
    },
    imageStyle: {
        width: '100%',
        height: 130,
        backgroundColor:'#EEE',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    servicesContainer: {
        flex: 1,
        maxHeight: 80,
        marginTop: 12,
        marginRight: 90,
        padding: 3,
        textAlign: 'justify',
        lineHeight: 25,
    },
    priceContainer: {
        position: 'absolute',
        bottom: 16,
        right: 10,
        alignItems: 'flex-end'
    },
    priceHeader: {
        color: '#999',
        fontSize: 12,
        alignSelf: 'flex-end',
        textAlign: 'right',
        width: 80,
    },
    price: {
        fontSize: 23,
        color: '#2a7800',
        fontWeight: '700'
    }
});
