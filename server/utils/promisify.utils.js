const 
    promisify = require('util.promisify'),
    jwt = require('jsonwebtoken'),
    { readFile }  = require('fs');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);
const readFileAsync = promisify( readFile );

module.exports = {
    signJWT, verifyJWT, readFileAsync
}
