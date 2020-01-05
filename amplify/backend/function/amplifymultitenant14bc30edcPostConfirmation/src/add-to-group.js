/* eslint-disable-line */ const aws = require('aws-sdk');
exports.handler = async (event, context, callback) => {
  const cisp = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  });
  const updateParams = {
    UserAttributes: [
      {
        Name: 'custom:tenant',
        Value: '', // ADD YOUR TENANT LOGIC HERE
      },
    ],
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  try {
    await cisp.adminUpdateUserAttributes(updateParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }
};
