var through = require('through2').obj;

module.exports = function (table){
  var retrn;
  return through(function (chunk, enc, cb) {
  		process.stdout.write('processing table: ['+table+']\r');
	    var newobj={}
	    newobj.table = table;  
	    Object.keys(chunk).forEach(function (k) {
	        //chunk[k] = 'value: ' + chunk[k]
	        newobj[k.toLowerCase()] = chunk[k];
	    })
	    this.push(JSON.stringify(newobj))
	    cb()
	})
}
