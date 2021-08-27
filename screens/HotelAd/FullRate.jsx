import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

import Star from 'react-native-star-view';

export default function FullRate() {
    return (
        <View style={styles.container}>
            <Text>Rating</Text>
            <Star 
                style={styles.star}
                score={2.5}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    star: {
        width: 100,
        height: 20,
        marginBottom: 20,
    }
})
