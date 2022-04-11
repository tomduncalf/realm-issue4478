/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Realm from 'realm';

console.log(Realm);
// open a local realm with the 'Cat' schema

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const LoginSchema = {
  name: 'Login',
  primaryKey: 'email',
  properties: {
    token: 'string',
    isClinician: 'bool',
    keepMeSignedIn: 'bool',
    email: 'string',
    password: 'string',
    clinicianToken: 'string',
  },
};
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const realmConfiguration = async onRealmConfigure => {
    Realm.open({
      schema: [LoginSchema],
      deleteRealmIfMigrationNeeded: true,
    }).then(realm => {
      console.log('Realm opened');
      const user = realm.objects('Login');
      console.log('LoginData', user.length);
      if (user.length > 0) {
        this.userDetails = user[0];
        console.log('LoginData', user[0]);
      } else {
        realm.write(() => {
          realm.create('Login', {
            token: 'ghshsbjsbd',
            isClinician: false,
            keepMeSignedIn: true,
            email: 'laxminarayan@gmail.ocm',
            password: 'hjhdd',
            clinicianToken: 'ndjgufgudgfu',
          });
        });
      }
    });
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    realmConfiguration().done();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
