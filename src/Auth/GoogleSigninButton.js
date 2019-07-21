import React from 'react';

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';

// Google Auth
import { GoogleSignin } from 'react-native-google-signin';

// localStorage custom methods
import { storeData, getData } from '../Store/GetStore/';

const googleAuth = async () => {
    try {
     // add any configuration settings here:
      await GoogleSignin.configure({
        webClientId: "887552431013-v84grmssvgejrv7lj1s76p9gapu1rgli.apps.googleusercontent.com"
      });
  
      const data = await GoogleSignin.signIn();
  
      // create a new firebase credential with the token
  
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
  
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      let userData = firebaseUserCredential.user.toJSON();

      storeData({
        key: 'userData',
        value: userData
      });
      console.log('Idhoor: ', await getData('userData'));
      //getData('userData', 's');
  
      //console.log('Display name here: ', userData.displayName);
    } catch (e) {
      console.log('Code bich error, GoogleSignin Component: ', e);
    }
}

const GoogleSigninButton = () => (
    <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.button2} onPress={ () => googleAuth() }>
            <Text style={ styles.buttonText2 }>Sign in with Google</Text>
        </TouchableOpacity>
    </View>
)

export default GoogleSigninButton;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
      },
      button2: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
      },
      buttonText: {
        fontWeight: '900',
        fontSize: 24
      },
      buttonText2: {
        fontWeight: '900',
        fontSize: 24,
        color: 'white'
      }
})