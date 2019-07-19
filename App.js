/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from './src/demo';

import firebase from 'react-native-firebase';

// Google Auth
import { GoogleSignin } from 'react-native-google-signin';

const anonSignIn = () => {
  firebase.auth().signInAnonymously()
    .then( () => console.log('Signed in!'))
    .catch( err => console.log(err) );
}

// Google auth
const googleLogin = async () => {
  try {
    console.log('Inside custom func');
    // add any configuration settings here:
    await GoogleSignin.configure({
      webClientId: "887552431013-v84grmssvgejrv7lj1s76p9gapu1rgli.apps.googleusercontent.com"
    });

    console.log('After configure');

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token

    console.log('After signIn');

    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

    console.log('After Credentials');

    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.log('Code bich error: ', e);
  }
}

const App = () => {
  //const [ anonAuth, updateAuth ] = useState(false);
  
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? (<View style={styles.engine}>
              <Text style={styles.footer}>Engine: NOT Hermes</Text>
            </View>) : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.button} onPress={ () => anonSignIn() }>
                <Text style={ styles.buttonText }>Sign in Anonymously</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.button2} onPress={ () => googleLogin() }>
                <Text style={ styles.buttonText2 }>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                This can be anything. We're giving a demo!
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
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
});

export default App;