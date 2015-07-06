var through = require('through2').obj
var AdmZip = require('adm-zip')

var outputDir = __dirname + '/out'
var tableFileNames = require('./tables.json')

module.exports = function (zipFile){
  var files= []
  //return through(function (chunk, enc, cb) {
	  		//reading archives 
	  		var zip = new AdmZip(zipFile)
	  		var zipEntries = zip.getEntries() // an array of ZipEntry records 
	  		console.log('zipFile',zipFile)
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
			return files
			//this.push(files)
  			//cb()
//		})
}






