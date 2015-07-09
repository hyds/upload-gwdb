function BaseError(){
    var error = Error.apply(this, arguments);

    this.__fieldSheetError = true;
    this.stack = error.stack;
    this.message = error.message || this.toString();
}
BaseError.prototype = Object.create(Error.prototype);
BaseError.prototype.constructor = BaseError;
BaseError.prototype.toString = function(){
    return this.message || this.constructor.name;
};
BaseError.prototype.valueOf = function(){
    return this;
};

BaseError.isFieldSheetError = function(obj){
    return obj instanceof BaseError || (obj != null && obj.__fieldSheetError);
};

module.exports = BaseError;