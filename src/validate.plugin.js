/* jshint -W101 */

var $           = require('mf-utils-node'),
    mongoose    = require('mongoose');

module.exports = function (schema) {

    schema.eachPath(function(pathName, schemaType){

        switch (schemaType.instance) {
            case 'String':
                validateString(schema, pathName, schemaType, schemaType.options);
                break;
            case 'Number':
                validateNumber(schema, pathName, schemaType, schemaType.options);
                break;
            case 'Array':
                validateArray(schema, pathName, schemaType, schemaType.options);
                break;
            default:
                break;
        }

    });
};

function getName (pathName, options) {
    options = options || {};
    return $.strings.isValid(options.name) ? options.name.trim() : pathName;
}

function validateString (schema, pathName, schemaType, options) {

    var _uidType = $.uuids.isValidUidType(options.uuid) ? options.uuid : null;
    if (_uidType) {
        schema.path(pathName).validate(function(v, fn){
            if (options.required || v) {
                switch (_uidType) {
                    case 'uid':
                        return $.uuids.isValidUid(v);
                    default:
                        return $.uuids.isValidV4(v);
                }
            }
        }, getName(pathName, options) + ' is not a valid identifier: {VALUE}');
    }

    var _chars = $.strings.isValid(options.validChars) ? options.validChars : null;
    var _case  = (_chars && options.isCaseSensitive === true);
    if (_chars) {
        schema.path(pathName).validate(function(v, fn){
            var val = options.trim ? (v || '').trim() : (v || '');
            var len = val.length;
            if (len > 0 || options.required) {
                return $.strings.isValid(v, _chars, _case);
            }
        }, getName(pathName, options) + ' constains invalid characters: {VALUE}');
    }


    var _minLength = ($.numbers.isNumber(options.minLength) && parseInt(options.minLength) >= 0) ? parseInt(options.minLength) : -1;
    var _maxLength = ($.numbers.isNumber(options.maxLength) && parseInt(options.maxLength) >= 0) ? parseInt(options.maxLength) : -1;

    if (_minLength < 0 && options.required) { _minLength = 1; }

    if (_minLength === _maxLength && _minLength > 0) {
        schema.path(pathName).validate(function(v, fn){
            var value = options.trim ? (v || '').trim() : (v || '');
            return (value.length === _minLength);
        }, getName(pathName, options) + ' must contain exactly ' + _minLength + (_minLength === 1 ? ' character' : ' characters') + ': {VALUE}');
    }

    if (_minLength > 0) {
        schema.path(pathName).validate(function(v, fn){
            var value = options.trim ? (v || '').trim() : (v || '');
            return (value.length >= _minLength);
        }, getName(pathName, options) + ' must contain at least ' + _minLength + (_minLength === 1 ? ' character' : ' characters') + ': {VALUE}');
    }

    if (_maxLength > 0) {
        schema.path(pathName).validate(function(v, fn){
            var value = options.trim ? (v || '').trim() : (v || '');
            return (value.length <= _maxLength);
        }, getName(pathName, options) + ' must contain no more than ' + _maxLength + (_maxLength === 1 ? ' character' : ' characters') + ': {VALUE}');
    }
}
function validateNumber (schema, pathName, schemaType, options) {

}
function validateArray (schema, pathName, schemaType, options) {

    var _minQty = ($.numbers.isNumber(options.minQty) && parseInt(options.minQty) >= 0) ? parseInt(options.minQty) : -1;
    var _maxQty = ($.numbers.isNumber(options.maxQty) && parseInt(options.maxQty) >= 0) ? parseInt(options.maxQty) : -1;

    if (_minQty < 0 && options.required) { _minQty = 1; }

    if (_minQty === _maxQty && _minQty > 0) {
        schema.path(pathName).validate(function(v, fn){

            return [].concat(v).filter(function(i){
                return (!i.auditDeleted);
            }).length === _minQty;

        }, getName(pathName, options) + ' must contain exactly ' + _minQty + (_minQty === 1 ? ' item.' : ' items.'));
    }

    if (_minQty > 0) {
        schema.path(pathName).validate(function(v, fn){

            return [].concat(v).filter(function(i){
                return (!i.auditDeleted);
            }).length >= _minQty;

        }, getName(pathName, options) + ' must contain at least ' + _minQty + (_minQty === 1 ? ' item.' : ' items.'));
    }

    if (_maxQty > 0) {
        schema.path(pathName).validate(function(v, fn){

            return [].concat(v).filter(function(i){
                return (!i.auditDeleted);
            }).length <= _maxQty;

        }, getName(pathName, options) + ' must contain no more than ' + _maxQty + (_maxQty === 1 ? ' item.' : ' items.'));
    }
}
