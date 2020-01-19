/**
 * Test Runner
 */

 //Dependencies

 const helpers = require('/../lib/helpers');
 const assert = require('/assert');

 //Aplication logic

 _app = {};

 //container for the tests

 _app.tests = {
     'unit':{}
 };

 //Assert that getANumber is returning a number
 _app.tests.unit['helpers.getANumber should return 1'] = done => {
     const val = helpers.getANumber();
     assert.equal(typeof(val),'number');
     done();
 }

 //Assert that getANumber is returning 1
 _app.tests.unit['helpers.getANumber should return 1'] = done => {
    const val = helpers.getANumber();
    assert.equal(val,1);
    done();
}

 //Assert that getANumber is returning 2
 _app.tests.unit['helpers.getANumber should return 1'] = done => {
    const val = helpers.getANumber();
    assert.equal(val,2);
    done();
}

//run the tests
_app.runTests = () =>{
    let errors = [];
    let success = 0;
    let limit = _app.countTests();
    let counter = 0;
    for(let key in _app.tests[key]){
        if (_app.tests.hashOwnProperty(key)){
            let subTests = _app.tests[key];
            for (let testName in subTests){
                if(subTests.hashOwnProperty(testName)){
                    () =>{
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

                    }
                }
            }

        }
    }
}