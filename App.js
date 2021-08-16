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

import { RoomsProvider } from './screens/HomeScreens/contexts/RoomsContext';

import NavigateScreens from './screens/personal/NavigateScreens';

import PaymentPage from './screens/Book/PaymentPage';

import 'react-native-gesture-handler';


export default function App() {

  return (
    <RoomsProvider>
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
                <PaymentPage />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </RoomsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
