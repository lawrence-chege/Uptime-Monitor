/**
 * Test Runner
 */

 

 //Aplication logic

 _app = {};

 //container for the tests

 _app.tests = {};

 //Add unit tests
 _app.tests.unit = require('./unit');


// count all the tests
_app.countTests = ()=>{
    let counter = 0;
    for(let key in _app.tests){
        if (_app.tests.hasOwnProperty(key)){
            let subTests = _app.tests[key];
            for (let testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    counter ++;
                }
            }

        }
    }
    return counter;

};

//run the tests
_app.runTests = () =>{
    console.log("------------Running tests-----------")
    let errors = [];
    let success = 0;
    let limit = _app.countTests();
    let counter = 0;
    for(let key in _app.tests){
        
        if (_app.tests.hasOwnProperty(key)){

            let subTests = _app.tests[key];
            for (let testName in subTests){
                
                if(subTests.hasOwnProperty(testName)){
                    (() =>{
                        let tmpTestName = testName;
                        let testValue = subTests[testName];
                        // call the tests
                        try {
                            testValue(()=>{
                                // If it calls back without throwing, then it succeeded
                                // log it in green
                                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                                counter++;
                                success++;
                                if(counter == limit){
                                    _app.produceTestReport(limit, success, errors);
                                }
                            })
                            
                        } catch (e) {
                            errors.push({
                                'name': testName,
                                'error': e
                            })
                            counter++;
                            console.log('\x1b[31m%s\x1b[0m', tmpTestName);
                            if(counter == limit){
                                _app.produceTestReport(limit, success, errors);
                            }
                        }

                    })();
                }
            }

        }
    }
};

//Produce test report
_app.produceTestReport = (limit,success,errors)=>{
    console.log("");
    console.log("----------- BEGIN TEST REPORT ----------");
    console.log("");
    console.log("Total Tests Run: ", limit);
    console.log("Pass: ", success);
    console.log("Fail: ", errors.length);
    console.log("");

    // if there are errors, print them in detail
    if (errors.length > 0){
        console.log("-------- BEGIN ERROR DETAILS --------");
        console.log("");

        errors.forEach((testError)=>{
            console.log('\x1b[31m%s\x1b[0m', testError.name);
            console.log({
                "Error Type": testError.error.name,
                "Expected value": testError.error.expected,
                "Actual Value": testError.error.actual,
                "Test operator": testError.error.operator
            });
            console.log("");

        });
        console.log("");
        console.log("---------- END ERROR DETAILS ----------");
    }
    console.log("");
    console.log("---------- END TEST REPORT ----------");
};

_app.runTests();