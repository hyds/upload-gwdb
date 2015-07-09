var through = require('through2').obj
var AdmZip = require('adm-zip')

var outputDir = __dirname + '/output'
var tableFileNames = require('./tables.json')

module.exports = function (zipFile){
  var files= []
  	console.log('hello zip', zipFile);
  	return through(function (buffer, enc, cb) {
  		//var zipFile = buffer.toString();
    	console.log('unzipper:',zipFile)
  		var zip = new AdmZip(zipFile)
		var zipEntries = zip.getEntries() // an array of ZipEntry records 
		
		zipEntries.forEach(function(zipEntry) {
	    	var fullTableFile = zipEntry.entryName.toString().split('/').pop()
		    tableFile = fullTableFile.split('.').shift().toLowerCase()
		    if ( tableFileNames[tableFile] != undefined) {
		    	var outFile = outputDir + '/'+  fullTableFile
		    	console.log('Writing',outFile )
		        zip.extractEntryTo(/*entry name*/zipEntry.entryName, /*target path*/outputDir, /*maintainEntryPath*/false, /*overwrite*/true)
		    	files.push(outFile)
		    }
		})
		this.push(files)
	    cb()
	})
}






