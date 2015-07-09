var fastn = require('./fastn');

var companyService = require('./companies');

module.exports = function(){
    return fastn('div', {'id':'login'},
	    fastn('div', {'id':'title'},
	      fastn('h1', 'Natural Resource Data Services')
	    ),
	    fastn('form',
	        fastn('div', 
	          fastn('h3', 'Login')
	        ),
	        fastn('input', {
	            placeholder: 'Company',
	            required: 'required',
	            value: fastn.binding('company')
	        }),
	        fastn('input', {
	            placeholder: 'User ID or email address',
	            required: 'required',
	            value: fastn.binding('user')
	        }),
	        fastn('input', {
	            placeholder: 'Password',
	            type: 'password',
	            required: 'required',
	            value: fastn.binding('password')
	        }),
	        fastn('button', 'Login' )
	    ).on('submit', function(event){
	        event.preventDefault();
	        // addTodo(newTodoBinding());
	        // todos.set('newTodo', '');
	    })
	);

    // return fastn('list',
    //     {
    //         class: 'companies',
    //         items: companyService.companies,
    //         template: function(model, scope){
    //             //return require('./company.js')().binding('item');
    //         }
    //     },
    //     fastn('button', {class: 'add'}, '+')
    //     .on('click', function(event, scope){
    //         //require('./newCompany')();
    //     })
    // );
};

