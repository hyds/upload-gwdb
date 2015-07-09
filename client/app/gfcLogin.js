var cpjax = require('cpjax');

var host = 'localhost';
var port = 8081;
var baseUrl = 'http://'+host+':'+port+'/';
console.log('baseUrl',baseUrl);

var makeRequest = require('request');

module.exports = function(callback){
	// cpjax({
 //        url: baseUrl + 'login',
 //        dataType: 'json',
 //        method: 'POST',
 //        json: {
 //            userName: 'gfc',
 //            password: 'gfctest'
 //        }
 //    }, function(error, token){
 //        callback(error, function(token){
 //            console.log('token',token)
 //            return token;
 //        });
 //    });

	makeRequest(
        {
            url: baseUrl + 'login',
            method: 'POST',
            json: {
                userName: 'gfc',
                password: 'gfctest'
            }
        },
        function(error, response, body){
            if (error){console.log("error: ", error)};
            return body.token;
        }
    );
}