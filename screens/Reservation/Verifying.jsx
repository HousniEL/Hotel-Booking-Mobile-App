import React from 'react';
import { Text, View } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Global from '../Global';

export default function Verifying({ cancel, setCancel, sendCancel }) {

    return (
        <Overlay isVisible={cancel} overlayStyle={{ width: '90%', maxWidth: 400, padding: 0, borderRadius: 5 }}>
            <Text style={{ margin: 10, fontSize: 20, color: '#444', fontWeight: '700', textAlign: 'center' }}>
                Verification Required
            </Text>
            <Text style={{ margin: 10, fontSize: 18, color: '#444', textAlign: 'center' }}>
                If you are sure, you must tap "Continue" to confirm your decision.
            </Text>
            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: 20 }}>
                <Button 
                    title='Cancel'
                    containerStyle={{ width: "50%", alignSelf: 'center' , borderRadius: 0   }}
                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, borderEndColor: '#ddd', borderRightWidth: 1, backgroundColor: 'transparent', borderRadius: 0 }}
                    titleStyle={{ color: 'tomato', fontSize: 18 }}
                    onPress={() => { setCancel() } }
                />
                <Button 
                    title='Continue'
                    containerStyle={{ width: "50%", alignSelf: 'center', borderRadius: 0   }}
                    buttonStyle={{ width: "100%", borderTopColor: '#ddd', borderTopWidth: 1, backgroundColor: 'transparent', borderRadius: 0  }}
                    titleStyle={{ color: Global.tabactive, fontSize: 18 }}
                    onPress={() => { sendCancel(); }}
                />
            </View>
        </Overlay>
    )
}
