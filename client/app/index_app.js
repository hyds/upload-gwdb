var cpjax = require('cpjax');
//var userService = require('./users');
var companyService = require('./companies');
var gfcToken = require('./gfcLogin')();
console.log('gfcToken', gfcToken);

var fastn = require('./fastn');

var app = fastn('div',
    require('./header')(),
    require('./login')()
);

window.onload = function(){
    app.render();

    document.body.appendChild(app.element);

    // Clear the selected user on click anywhere
    // Capture phase to allow bubbled events to set the selected user
    document.addEventListener('click', function(){
        //userService.selectedUser(null);
        companyService.selectedCompany(null);
    }, true);
};
