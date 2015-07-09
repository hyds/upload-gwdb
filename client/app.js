// Require and initialise fastn
var fastn = require('fastn/')({
    list: require('fastn/listComponent'),
    text: require('fastn/textComponent'), // Renders text
    _generic: require('fastn/genericComponent') // Renders DOM nodes
}, true);

//var companies = require('./companies');
// var Companies = [ 'QLD NRM', 'VIC DEPI', 'NSW DEPI', 'Thiess', 'ALS'];

// var companies = new fastn.Model({companies:Companies});

// function addTodo(todo){
//     todos.push('todos', todo);
// }

// var newTodoBinding = fastn.binding('newTodo');

var app = fastn('div', {'id':'login'},
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
)

app.render();

// Wait till the document is ready.
window.addEventListener('load', function(){
    document.body.appendChild(app.element);
});
