import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify, {Auth} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);
// Use ID token instead of access token in API calls
Amplify.configure({
  API: {
    graphql_headers: async () => {
      const session = await Auth.currentSession();
      return {
        Authorization: session.getIdToken().getJwtToken(),
      };
    },
  },
});

AppRegistry.registerComponent(appName, () => App);
