/**
 * Request handlers
 */

 //Dependecies
 const _data = require('./data');
 const helpers = require('./helpers');

 //Define the handlers
const handlers = {}

//user handler
handlers.users = (data, callback) => {
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback);
    } else{
        callback(405);
    }

};

//container for the users submethods
handlers._users = {};

//users post 

//Required data: firstName, lastName, country, phone, password, keepLogged

handlers._users.post = (data, callback)=>{

    //check that all required field are provided
    const firstName = typeof(data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0? data.payload.firstName.trim() : false; 
    const lastName = typeof(data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0? data.payload.lastName.trim() : false;
    const country = typeof(data.payload.country) == "string" && data.payload.country.trim().length > 0? data.payload.country.trim() : false;
    const phone = typeof(data.payload.phone) == "string" && data.payload.phone.trim().length == 10? data.payload.phone.trim() : false;
    const keepLogged = typeof(data.payload.keepLogged) == "boolean" && data.payload.keepLogged == true ? true : false;
    const password = typeof(data.payload.password) == "string" && data.payload.password.trim().length > 0? data.payload.password.trim() : false;

    if (firstName && lastName && country && phone && password && keepLogged){

        // make sure that the user doesnt exist
        _data.read('users', phone,(err,data)=>{

            if(err){

                //hash the password
                const hashedPassword = helpers.hash(password);

                //create the user object
                if (hashedPassword){
                    const userObject = {
                        'firstName' : firstName,
                        'lastName': lastName,
                        'country': country,
                        'phone':phone,
                        'password': hashedPassword,
                        'keepLogged': keepLogged
    
                    };
    
                    //store the user
                    _data.create('users',phone,userObject, (err)=>{
                        if(!err){
                            callback(201,{'Message': "User created successfully"});
    
                        } else {
                            console.log(err);
                            callback(500,{'Error' : 'Could not create the new user'});
                        }
    
                    });

                } else{
                    callback(500,{'Error': 'Could not hash the passord'});
                }
                


            } else{
                //user already exists
                callback(400, {'Error' : 'A user with that number already exists'});
            }

        });


    } else{
        callback(400, {'Error': 'Missing required fields'});
    }
};

//users get 
// required data: phone
//@TODO Only let an authenticated user access their own

handlers._users.get = (data, callback)=>{
    //check that the phone number is valid
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10? data.queryStringObject.phone.trim() : false;
    if(phone){
        // Lookup the user
        _data.read('users', phone,(err,data) =>{
            if(!err && data){
                //remove the hashed passowrd
                delete data.password;
                callback(200, data);

            } else{
                callback(404,{'Error': 'User not found'});
            }

        });

    } else{
        callback(400,{'Error':'Missing required field'});
    }

};

//users put 
// required data: phone
//optional data : firstname,lastname, passwors,country
//@TODO Only let an authenticated user access their own
handlers._users.put = (data, callback)=>{
    // check for the required field
    const phone = typeof(data.payload.phone) == "string" && data.payload.phone.trim().length == 10? data.payload.phone.trim() : false;
    //check for optional field

    const firstName = typeof(data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0? data.payload.firstName.trim() : false; 
    const lastName = typeof(data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0? data.payload.lastName.trim() : false;
    const country = typeof(data.payload.country) == "string" && data.payload.country.trim().length > 0? data.payload.country.trim() : false;
    const keepLogged = typeof(data.payload.keepLogged) == "boolean" && data.payload.keepLogged == true ? true : false;
    const password = typeof(data.payload.password) == "string" && data.payload.password.trim().length > 0? data.payload.password.trim() : false;

    //Error if the phone is invalid
    if(phone){
        //Error if nothing is sent to update
        if(firstName || lastName || country || password || keepLogged){
            // lookup user
            _data.read('users',phone,(err,userData) => {
                if(!err && userData){
                    // update te fields
                    if(firstName){
                        userData.firstName = firstName;
                    }
                    if (lastName){
                        userData.lastName = lastName;
                    }
                    if(country){
                        userData.country = country;
                    }
                    if (password){
                        userData.password = helpers.hash(password);
                    }
                    if(keepLogged){
                        userData.keepLogged = keepLogged;
                    }

                    //store the new upject
                    _data.update('users', phone, userData, (err)=>{
                        if(!err){
                            callback(200,{"Message": "User updated successfully"});
                        } else{
                            console.log(err);
                            callback(500,{"Error": "Could not update user"});
                        }

                    });

                } else {
                    callback(400,{'Error': 'The specified user does not exist'});
                }
                


            })

        } else{
            callback(400,{'Error':'Missing field to update'});
        }

    } else{
        callback(400,{'Error':'Missing required field'});
    }
  


};
//users delete
// required data: phone
//@TODO Only let an authenticated user access their own
//@TODO delete any other data files associated with this user

handlers._users.delete = (data, callback)=>{
     //check that the phone number is valid
     const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10? data.queryStringObject.phone.trim() : false;
     if(phone){
         // Lookup the user
         _data.read('users', phone,(err,data) =>{
             if(!err && data){
                 _data.delete('users',phone,(err)=>{
                     if(!err){
                         callback(200, {"Message": "User deleted successfully"});
 
                     } else {
                         callback(500, {"Error": "Could not delete this user"});
                     }
 
                 });
                 
 
             } else{
                 callback(400,{'Error': 'User not found'});
             }
 
         });
 
     } else{
         callback(400,{'Error':'Missing required field'});
     }
   

};

//uptime router
handlers.ping = (data, callback) => {
    callback(200);

};

//Not found handler
handlers.notFound = (data, callback) => {
    callback(404);

};
//Export the handlers
module.exports = handlers;