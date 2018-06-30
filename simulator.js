var appLogic = require('./appLogic');

var result;
var inputWord = {pad: 'N', clen_typ: 'urcity_clen', clen: 'die', prid: 'böse', podst: 'Frau'};
console.log(inputWord);
result = appLogic.calcResult(inputWord);
console.log(result);