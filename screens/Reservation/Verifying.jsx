import React from 'react';
import { Text, View } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Global from '../Global';

export default function Verifying({ cancel, setWait, setCancel, sendCancel }) {

    return (
        <Overlay isVisible={cancel} overlayStyle={{ width: '90%', maxWidth: 400, padding: 0, borderRadius: 5 }}>
            <Text style={{ margin: 10, fontSize: 20, color: '#444', fontWeight: '700', textAlign: 'center' }}>
                Verification Required
            </Text>
            <Text style={{ margin: 10, fontSize: 18, color: '#444', textAlign: 'center' }}>
                Did you read the hotel cancellation policy?, if so and you are sure of your decision, you must tap "Continue" to confirm it.
            </Text>
            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: 20 }}>
                <Button 
                    title='Cancel'
                    containerStyle={{ width: "50%", alignSelf: 'center' , borderRadius: 0   }}
                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, borderEndColor: '#ddd', borderRightWidth: 1, backgroundColor: 'transparent', borderRadius: 0 }}
                    titleStyle={{ color: 'tomato', fontSize: 18 }}
                    onPress={() => { setCancel(); setWait(false); } }
                />
                <Button 
                    title='Continue'
                    containerStyle={{ width: "50%", alignSelf: 'center', borderRadius: 0   }}
                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, backgroundColor: 'transparent', borderRadius: 0  }}
                    titleStyle={{ color: Global.tabactive, fontSize: 18 }}
                    onPress={() => { setCancel(); sendCancel(); }}
                />
            </View>
        </Overlay>
    )
}
