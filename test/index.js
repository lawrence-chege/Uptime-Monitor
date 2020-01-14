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
