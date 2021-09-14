const { secretKey } = require('../config/configuration.json').jwt;
const jwt = require('jsonwebtoken');

exports.createToken = async(userID, res) => {
  
  const token = await jwt.sign({userID}, secretKey, {
    algorithm: 'HS256'
  });

  return res
    .cookie('access_token', token, {
      httpOnly: false
    })
    .status(200);
};