import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableHighlight
} from 'react-native';

import { LinearProgress, Overlay, Button } from 'react-native-elements';

import StarRating from 'react-native-star-rating';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import HotelService from '../../services/HotelService';

import * as SecureStore from 'expo-secure-store';

export default function Reviews({ rating, setRating, hotelId }) {

    const rate = rating.Rate / 5;

    const [ show, setShow ] = useState(false);
    const [ rates, setRates ] = useState();

    async function getRates() {
        var rated = await SecureStore.getItemAsync('rated');
        setRates(JSON.parse(rated));
    }

    getRates();

    function handlePress(){
        setShow(!rates.includes(hotelId));
    }

    return (
        <>
        <TouchableHighlight underlayColor={'transparent'} onPress={handlePress}>      
            <View style={ styles.container }>
                <View style={{ width: '30%' }}>
                    <Text style={ styles.text }>
                        <Text>{ rating.Num_opinions }</Text> Reviews
                    </Text>
                </View> 
                <View style={{ width: '70%' }}>
                    <Text>
                        <Text style={{ color: Global.secondary }}>{ rating.Rate }</Text>/5
                    </Text>
                    <LinearProgress 
                        style={{ width: '100%' }}
                        color={Global.secondary}
                        trackColor={'#ddd'}
                        value={rate}
                        variant={'determinate'}
                    />
                </View>
            </View>
        </TouchableHighlight>
        <Overlay isVisible={show} overlayStyle={ styles.overlay }>
            <Stars setShow={setShow} setRating={setRating} hotelId={hotelId} rates={rates} />
        </Overlay>
        </>
    )
};

function Stars({ setShow, setRating, hotelId, rates }){

    const [ stars, setStars ] = useState(0);

    const [ disable, setDisable ] = useState(false);

    async function handleSubmit(){
        setDisable(true);
        rates.push(hotelId);
        await SecureStore.deleteItemAsync('rated');
        await SecureStore.setItemAsync('rated', JSON.stringify(rates));
        const hotelService = new HotelService();
        var object = {
            hotel_id: hotelId,
            rate: stars
        }
        hotelService.rate(object, (res) => {
            res.Rate = res.Rate.toFixed(2);
            setRating(res);
            setDisable(false);
            setShow(false);
        }, (err) => {
            setDisable(false);
        })
    }

    return (
        <>
            <View style={ styles.messageContainer }>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => { setShow(false) }}>
                    <MaterialCommunityIcons name={'close'} color={'white'} size={24} style={{ alignSelf: 'flex-end' }} />
                </TouchableHighlight>
                <View style={{ padding: 15 }}>
                    <Text style={ styles.overlayTitle }>
                        DO YOU LIKE THIS HOTEL?
                    </Text>
                    <Text style={ styles.overlayMessage }>
                        Give a quick rating so we know if you like it. 
                    </Text>
                </View>
            </View>
            <View style={ styles.starStyle }>
                <StarRating 
                    disabled={false}
                    rating={stars}
                    maxStars={5}
                    selectedStar={ (rating) => { setStars(rating) } }
                    halfStarEnabled={true}
                    fullStarColor={Global.secondary}
                />
            </View>
            <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 25 }}>
                <Button 
                    title={'Submit'}
                    containerStyle={{ width: '22%' }}
                    buttonStyle={{ width: '100%', borderRadius: 5, padding: 6, backgroundColor: Global.secondary }}
                    titleStyle={{ fontSize: 14 }}
                    onPress={ handleSubmit }
                    disabled={ stars === 0 || disable }
                    disabledStyle={{ backgroundColor: '#909494' }}
                    disabledTitleStyle={{ color: 'white' }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center'
    },
    text: {
        maxWidth: 60,
        textAlign: 'center'
    },
    starStyle: {
        alignSelf: 'center',
        marginTop: 10,
        width: '70%'
    },
    overlay: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 5,
        padding: 0
    },
    messageContainer: {
        backgroundColor: Global.secondary,
        margin: 0,                                                                                                                                                                                                                                                                                                                                            
        marginBottom: 20,
        padding: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    overlayTitle: {
        textAlign: 'center',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             fontSize: 20,
        fontWeight: "700",
        color: 'white',
        marginBottom: 10
    },
    overlayMessage: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    }
});


