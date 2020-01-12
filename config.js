/**
 * Configuration file
 * Create and export configuration varriables
 */

 // container for all ebvironments
 const environments = {};

 // create staging {default} environment

 environments.staging = {
     'httpPort': 3000,
     'httpsPort' : 3500,
     'envName': 'staging',
     'hashingSecret': 'this is aSecret'

 };

 //create production environment

 environments.production = {
    'httpPort': 5000,
    'httpsPort' : 5500,
    'envName': 'production',
    'hashingSecret': 'this is also a Secret'

 };

 //determine which environment to be passed as a cmd argument
 const currentEnvironment = typeof(process.env.NODE_ENV) == 'string'? process.env.NODE_ENV.toLowerCase(): '';

 //check if the env set is among available env objects

 const environmentToExport = typeof(environments[currentEnvironment]) == 'object'? environments[currentEnvironment] : environments.staging;

 //Export the module

 export default environmentToExport;

