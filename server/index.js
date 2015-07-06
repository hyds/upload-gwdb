var http = require('http'), 
	fs = require('fs');
 

var server = http.createServer(function (req, res) {
	res.removeHeader("Cache-Control");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	var dat = [], datLen = 0; 

	var writeStream = fs.createWriteStream(__dirname + '/out.jpg');

	//console.log('headers: ',req.headers);
	console.log('name: ',req.name);


	req.on('data', function (data) {
		//var f =   data.toString();
		//console.log("f", f);
		writeStream.write(data);
		dat.push(data);
        datLen += dat.length;
		//console.log('recieved a file',data);
	});
	req.on('end', function() {
		writeStream.end();
		res.statusCode = 200;
		res.end('OK');	
	});
});

server.listen(8000);
