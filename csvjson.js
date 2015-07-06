//var csv2json  = require('csv2json');
var fs = require('fs');
var lowerCaseKeys = require('./lowerCaseKeys.js');
var parser = require('csv-parser')
var writer = require('csv-write-stream');


//var path = __dirname + '/DP_GWDBQLD/GWDB QLD Data Files';
var path = __dirname + '/zip_test/DP_GWDBQLD.zip';
//var path = __dirname + '/DP_GWDBQLD/test';


//var files = fs.readdirSync(path);
var unzip = require('./zip_test');
var files = unzip(path);

var through = require('through2');
    //console.log(path,files);


var parserOptions = {
          //raw: false,     // do not decode to utf-8 strings
          separator: '|' // specify optional cell separator
          //newline: '\n'  // specify a newline character
          //strict: true    // require column length match headers length
        };

var writerOptions = {};

for (var i = 0; i < files.length;  i++) {
    //var filename = path +'/'+files[i];
    var filename = files[i].toString();
    
    var fullTableFile = filename.split('/').pop()
    var table = fullTableFile.split('.').shift().toLowerCase();
                
    var outFile = __dirname + '/output/' + fullTableFile.replace('txt','json').toLowerCase();
    
    //console.log('filename',filename);
    //console.log('processing ',outFile);
    console.log('table',table);

    fs.createReadStream(filename)
        .pipe( parser(parserOptions) )
        .pipe( lowerCaseKeys(table) )
    
      // .on('data', function(data) {
      //   console.log('row', data)
      // })
      //  .pipe( through.obj(transform) )
        //.pipe(writer())
        .pipe( fs.createWriteStream(outFile) );
      //.pipe(writer())

      //.pipe(process.stdout)
      //.on('end',function(){ console.log('done')})

// Prepend all chunks with `value: `.
// @param {Object} chunk
// @param {String} encoding
// @param {Function} callback
function transform (chunk, enc, cb) {
    var newobj={}  
    Object.keys(chunk).forEach(function (k) {
        //chunk[k] = 'value: ' + chunk[k]
        newobj[k.toLowerCase()] = chunk[k];
    })
    this.push(JSON.stringify(newobj))
    cb()
}


};





// fs.createReadStream(path.join(__dirname, '../test/data/dummy.csv'))
//   .pipe(parse())
//   .pipe(through.obj(transform))
//   .pipe(write())