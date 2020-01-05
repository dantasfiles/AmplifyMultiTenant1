import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';

// after confirmation, the tenant custom attribute
//   will appear in the id token
async function fetchUserInfo(setTenant) {
  // get the id token of the signed in user
  const {idToken} = await Auth.currentSession();
  // get the tenant custom attribute from the id token
  const tenant = idToken.payload['custom:tenant'];
  setTenant(tenant);
}

const App = withAuthenticator(() => {
  const [tenant, setTenant] = useState('');
  useEffect(() => {
    fetchUserInfo(setTenant);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            AWS Amplify Multi-Tenancy Example
          </Text>
          <Text style={styles.sectionDescription}>Your tenant is {tenant}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default App;
