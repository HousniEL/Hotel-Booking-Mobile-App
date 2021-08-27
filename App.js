import React from 'react';

import { 
  View,
  StyleSheet, 
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//import NavigateScreens from './screens/personal/NavigateScreens';

//import PaymentPage from './screens/Book/PaymentPage';

//import StripePayment from './screens/Book/StripePayment';

import Signup from './screens/personal/Signup';

import 'react-native-gesture-handler';
import First from './screens/FirstConnection';


export default function App() {

  return (
    <>
      <StatusBar translucent barStyle={'default'} />
      <SafeAreaView style={[styles.container]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1, width: "100%"}}
        >
          <TouchableWithoutFeedback style={{ height: '100%'}} onPress={Keyboard.dismiss}>
            <View 
              onStartShouldSetResponder={() => true}
              style={{
                flex: 1,
                marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0
              }}
            >
                <First />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
