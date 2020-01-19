 /**
  * Unit tests
  */
 //Dependencies

 const helpers = require('./../lib/helpers');
 const assert = require('assert');
 const logs = require('./../lib/logs');
 const debugingProblem = require('./../lib/debugingProblem');

 //holder for tests

 const unit = {};

 //Assert that getANumber is returning a number
 unit['helpers.getANumber should return a number'] = done => {
    const val = helpers.getANumber();
    assert.equal(typeof(val),'number');
    done();
}

//Assert that getANumber is returning 1
unit['helpers.getANumber should return 1'] = done => {
   const val = helpers.getANumber();
   assert.equal(val,1);
   done();
}

//Assert that getANumber is returning 2
unit['helpers.getANumber should is returning 2'] = done => {
   const val = helpers.getANumber();
   assert.equal(val,2);
   done();
}



//export the module
module.exports = unit;