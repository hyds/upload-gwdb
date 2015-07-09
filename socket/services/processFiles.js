var fs = require('fs');
var through = require('through2').obj
var keysToLowerCase = require('./keysToLowerCase.js');
var parser = require('csv-parser')
var writer = require('csv-write-stream');

var parserOptions = {
          //raw: false,     // do not decode to utf-8 strings
          separator: '|' // specify optional cell separator
          //newline: '\n'  // specify a newline character
          //strict: true    // require column length match headers length
        };

module.exports = function (){
    return through(function (files, enc, cb) {
      for (var i = 0; i < files.length;  i++) {
        var filename = files[i].toString();
        
        var fullTableFile = filename.split('/').pop()
        var table = fullTableFile.split('.').shift().toLowerCase();
                    
        var outFile = __dirname + '/output/' + fullTableFile.replace('txt','json').toLowerCase();
        
        fs.createReadStream(filename)
            .pipe( parser(parserOptions) )
            .pipe( keysToLowerCase(table) )
            .pipe( fs.createWriteStream(outFile) );
      }
      this.push(filename)
      cb()
  })
}
   