/**
 * Library for storing and editing data
 */

 //Dependencies

 const fs = require('fs');
 const path = require('path');
 const helpers = require('./helpers');

 //container for the module to be exported 
  const lib = {}

  // Base directory of the data folder
  lib.baseDir = path.join(__dirname,'/../.data/');

  //write data to a file
  lib.create = (dir,file,data,callback) =>{
      //open the file for writing
      fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err,fileDescriptor)=>{
          if(!err && fileDescriptor){
              //convert data to a string
              const stringData = JSON.stringify(data);

              //write to file and close it
              fs.writeFile(fileDescriptor,stringData, (err)=>{
                  if(!err){
                      fs.close(fileDescriptor, (err)=>{
                        if(!err){
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }

                      });
                  }else{
                      callback('Could not write to file');
                  }
                  
              });
          } else{
              callback('Could not create new file, it may already exist');
          }
      });
  };

  //read data from a file
  lib.read = (dir,file,callback) => {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err,data)=>{
        if(!err && data){
            const parsedData = helpers.parseJsonToObject(data);
            callback(false,parsedData)
        } else{
            callback(err,data);
        }
        
    });
};

//update data inside a file
lib.update = (dir,file,data,callback) => {
    //open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor) =>{
        if(!err && fileDescriptor){
            //Convert data to string
            const stringData = JSON.stringify(data);

            //truncate the file
            fs.truncate(fileDescriptor, (err) =>{
                if(!err){
                    //write to file and close it
                    fs.writeFile(fileDescriptor, stringData, (err) =>{
                        if(!err){
                            fs.close(fileDescriptor, (err) =>{
                                if(!err){
                                    callback(false);

                                } else{
                                    callback('Error closing the file');
                                }

                            });

                        }else{
                            callback('Error writing to existing file');
                        }

                    });

                } else{
                    callback('Error truncating the file');
                }
            });
            
        } else {
            callback(' Could not open the file for updating, it may not exist yet');
        }
    });
};

//delete a file 
lib.delete = (dir,file,callback)=>{
    //unlink the file
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err) =>{
        if(!err){
            callback(false);
        } else{
            callback('Error deleting file');
        }
    });

};
  module.exports = lib;