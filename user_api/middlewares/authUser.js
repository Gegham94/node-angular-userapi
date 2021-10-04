const { secretKey } = require('../config/configuration.json').jwt;
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers['x-authorization'];
  if (!token) {
    return res.status(403).send('Token is not provided !');
  }

  try{
    await jwt.verify(token, secretKey);
    return next();
    
  } catch (err) {
    if(err instanceof jwt.JsonWebTokenError){
      return res.status(401).send('Invalid token !');
    };
  }
};