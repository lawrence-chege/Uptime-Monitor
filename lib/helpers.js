/**
 * Helpers for various tasks
 */
//dependencies
const crypto = require('crypto');
const config = require('./../config');
 // container for the helpers

 const helpers = {};

 //create a SHA256 hash

 helpers.hash = (str) => {
     if(typeof(str) == 'string' && str.length > 0){
         const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
         return hash;

     } else{
         return false;
     }

 };

 // Parse a JSON string to an object in all cases 
 helpers.parseJsonToObject = (str)=>{
     try {
         const obj = JSON.parse(str);
         return obj;
     } catch (e) {
         return {};         
     }
 }

 // create a string of random alphanumeric characters of a given length
helpers.createRandomString = (strLength)=>{
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength: false;
    if(strLength){
        const possibleCharacter = 'qwertyuiopasdfghjklzxcvbnm1234567890';
        let str = '';
        for(i=1;i<=strLength;i++){

            //Get character from possibleCharacters
            let randomCharacter = possibleCharacter.charAt(Math.floor(Math.random = possibleCharacter.length));

            //add random character to string
            str += randomCharacter;
        }

        //return the final string
        return str;

    } else{
        return false
    }

};


 //sample for testing that simply returns a number
 helpers.getANumber = () => 1;

 //Export the module
 module.exports = helpers;