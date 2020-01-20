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
    const email = typeof(data.payload.email) == "string" && data.payload.email.trim().length > 0? data.payload.email.trim() : false;

    if (firstName && lastName && country && phone && email){

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
                        'email': email
    
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
    const email = typeof(data.payload.email) == "string" && data.payload.email.trim().length > 0? data.payload.email.trim() : false;

    //Error if the phone is invalid
    if(phone){
        //Error if nothing is sent to update
        if(firstName || lastName || country || email){
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
                    
                    if(email){
                        userData.email = email;
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

//token handler
handlers.tokens = (data, callback) => {
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data,callback);
    } else{
        callback(405);
    }

};

//container for the tokens methods

handlers._tokens = {};

// Tokens post
// Required data phone & pasword
handlers._tokens.post = (data, callback)=>{
    const phone = typeof(data.payload.phone) == "string" && data.payload.phone.trim().length == 10? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == "string" && data.payload.password.trim().length > 0? data.payload.password.trim() : false;
    if (phone && password){
        //llokup the user who matches the phone data
        _data.read('users', phone,(err,userData) =>{
            if(!err && userData){
                //Match the pasword sent vs saved hashed password

                //hash the password
                const hashedPassword = helpers.hash(password);
                if (hashedPassword == userData.password){
                    //create a new token and set an expiration date
                    const tokenId = helpers.createRandomString(20);

                    const expires = Date.now() + 1000*60*60;

                    const tokenObject = {
                        'phone': phone,
                        'id': tokenId,
                        'expires': expires
                    };

                    //store the token
                    _data.create('tokens',tokenId, tokenObject, (err)=>{
                        if(!err){
                            callback(200,tokenObject);
                        } else{
                            callback(500,{"Error": "could not create a new token"});
                        }

                    });



                } else{
                    callback(400,{"Error":"Wrong credentials"});
                }


            } else{
                callback(400,{"Error": "User was not found"});
            }

        });

    } else{
        callback(400,{"Error":"Missin required field(s)"})
    }

};

// Tokens get
// Required data : id
handlers._tokens.get = (data, callback)=>{
    //check that the id is valid
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20? data.queryStringObject.id.trim() : false;
    if(id){
        // Lookup the token
        _data.read('tokens',id,(err,data) =>{
            if(!err && data){
                callback(200, data);

            } else{
                callback(404,{'Error': 'Token not found'}, err);
            }

        });

    } else{
        callback(400,{'Error':'Missing required field'});
    }


};

// Tokens put
//required data : id, extend
handlers._tokens.put = (data, callback)=>{
    const extend = typeof(data.payload.extend) == "boolean" && data.payload.extend == true ? true : false;
    const id = typeof(data.payload.id) == "string" && data.payload.id.trim().length > 0? data.payload.id.trim() : false;


};

// Tokens delete
handlers._tokens.delete = (data, callback)=>{

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