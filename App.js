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

import Global from './screens/Global';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import First from './screens/FirstConnection';

import 'react-native-gesture-handler';

export default function App() {

  return (
    <>
      <StatusBar translucent backgroundColor={Global.primary} />
      <SafeAreaView style={[styles.container]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flexGrow: 1, width: "100%" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View 
              onStartShouldSetResponder={() => true}
              style={{
                flexGrow: 1,
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
