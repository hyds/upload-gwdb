// Require and initialise fastn
var fastn = require('fastn/')({
    // component constructors.. Add what you need to use

    text: require('fastn/textComponent'), // Renders text
    _generic: require('fastn/genericComponent') // Renders DOM nodes
});

var something = fastn('input', {

        //Bind its value to 'stuff'
        value: 'hello'
    });


something.render();

var someComponent = fastn('section',
        fastn('textBox', 'I\'m a component! :D')
    );

someComponent.attach({
    url: 'http://google.com'
});

someComponent.render();

// Wait till the document is ready.
window.addEventListener('load', function(){
    document.body.appendChild(something.element);
    document.body.appendChild(someComponent.element);
});