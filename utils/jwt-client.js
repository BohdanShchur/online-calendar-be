const jwt = require('jsonwebtoken');
const {SECRET} = require('./dotEnv');

class JWTClient {
  constructor(userId, email) {
    this.userId = userId;
    this.email = email;
  }

  generateAccessToken() {
    return this.createToken(
      { userId: this.userId, email: this.email },
      SECRET,
      { expiresIn: "2h" }
    );
  }

  createToken() {
    return jwt.sign({ userId: this.userId, email: this.email }, SECRET, {expiresIn: '2h'});
  }

  decodeToken(token) {
    let decoded = '';
    if (!token) {
      return decoded;
    }
    decoded = jwt.verify(token, SECRET);
    return decoded;
    
  }
}

module.exports = {
  jwtClient: new JWTClient(),
  JWTClient,
};
