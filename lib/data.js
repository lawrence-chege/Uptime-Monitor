/**
 * Library for storing and editing data
 */

 //Dependencies

 const fs = require('fs');
 const path = require('path');

 //container for the module to be exported 
  const lib = {}

  // Base directory of the data folder
  lib.baseDir = path.join(__dirname,'/../.data/');

  //write data to a file
  lib.create = (dir,file,data,callback) =>{
      //open the file for writing
      fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor)=>{
          if(!err && fileDescriptor){
              //convert data to a string
              const stringData = JSON.stringify(data);

              //write to file and close it
              fs.writeFile(fileDescriptor,(err)=>{
                  if(!err){
                      fs.close(fileDescriptor, (err)=>{
                        if(!err){
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }

                      });
                  }
                  
              });
          } else{
              callback('Could not create new file, it may already exist');
          }
      })
  }

  module.exports = lib;