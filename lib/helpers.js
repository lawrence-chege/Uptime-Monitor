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

 //sample for testing that simply returns a number
 helpers.getANumber = () => 1;

 //Export the module
 module.exports = helpers;