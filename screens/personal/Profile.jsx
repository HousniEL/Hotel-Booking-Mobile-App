import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { Button } from 'react-native-elements';

import { useAuth } from '../../contexts/AuthContext';

import AddCreditCard from './AddCreditCard';

import CardInfo from './credit card/CardInfo';

import CreditCardService from '../../services/CreditCardService';

import Loading from '../Loading';

function ProfileInfo({ navigation, showHeader }) {

    const { currentUser } = useAuth();

    const [ looking, setLooking ] = useState(true);
    const [ cardInfo, setCardInfo ] = useState();
    
    const [ refresh, setRefresh ] = useState(false);

    useEffect(() => {
        setCardInfo();
        setLooking(true);
        var creditCardService = new CreditCardService();
        creditCardService.getLessCreditCardInfo({ 'user_id' : currentUser.id }, (response) => {
            if(!response.message){
                setCardInfo(response);
            } else {
                setCardInfo();
            }
            setLooking(false);
        }, (error) => {
        });
    }, [refresh]);

    return (
        <>
        {
            looking ? (
                <Loading />
            ) : (
                <View style={{flex: 1, width: '90%', maxWidth: 450, alignSelf: 'center', paddingTop: '10%'}}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text style={styles.mainTitle}>My Account</Text>
                        <View style={styles.singleContainer}>
                            <Text style={styles.miniTitle}>First Name</Text>
                            <Text style={styles.value}>{ currentUser['First_Name'] }</Text>
                        </View>
                        <View style={styles.singleContainer}>
                            <Text style={styles.miniTitle}>Last Name</Text>
                            <Text style={styles.value}>{ currentUser['Last_Name'] }</Text>
                        </View>
                        <View style={styles.singleContainer}>
                            <Text style={styles.miniTitle}>Email</Text>
                            <Text style={styles.value}>{ currentUser['Email'] }</Text>
                        </View>
                        <View style={styles.lastSingleContainer}>
                            <Text style={styles.miniTitle}>Phone Number</Text>
                            <Text style={styles.value}>{ currentUser['Phone_Number'] }</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 20, marginTop: 30 }}>
                        <Text style={styles.mainTitle}>Billing</Text>
                        {
                            !cardInfo && (
                                <>
                                    <Text style={styles.reminder}>This account does not have a credit card.</Text>
                                    <Button 
                                        title='Add credit card'
                                        buttonStyle={{ backgroundColor: '#444' }}
                                        onPress={() => { showHeader(false); navigation.push('addCC') }}
                                    />
                                </>
                            )
                        }
                        {
                            cardInfo && (
                                <CardInfo cardInfo={cardInfo} userID={currentUser.id} refresh={refresh} setRefresh={setRefresh} />
                            )
                        }
                    </View>
                </View>
            )
        }
        </>
    )
}

export default function Profile({ showHeader, handleSignIn }){

    return (
        <Stack.Navigator
            initialRouteName="info"
            screenOptions={{ headerShown: false }}
        > 
            <Stack.Screen name='info'>
                { props => <ProfileInfo {...props} showHeader={showHeader} handleSignIn={handleSignIn} /> }
            </Stack.Screen>
            <Stack.Screen name='addCC'>
                { props => <AddCreditCard {...props} showHeader={showHeader} /> }
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    singleContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 12
    },
    lastSingleContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 7
    },
    mainTitle :{
        fontSize: 18,
        color: '#222',
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 20
    },
    miniTitle: {
        color: '#333',
        fontSize: 15
    },
    value: {
        color: '#666',
        fontSize: 16
    },
    reminder: {
        textAlign: 'center',
        color: '#777',
        marginBottom: 20
    },
    cardContainer: {
        padding: 15,
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    verifieIcon: {
        width: 22,
        height: 22,
        padding: 3,
        borderRadius: 25,
        borderColor: 'green',
        borderWidth: 2,
    },
    content: {
        fontWeight: '700',
        color: '#777',
        margin: 2
    }
})