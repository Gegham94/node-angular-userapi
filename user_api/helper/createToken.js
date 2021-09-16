const { secretKey } = require('../config/configuration.json').jwt;
const jwt = require('jsonwebtoken');

exports.createToken = async(userID) => {
  
  const token = await jwt.sign({userID}, secretKey, {
    algorithm: 'HS256'
  });
  return token;
  // return res.cookie('access_token', token, {httpOnly: false, secure: true});
};