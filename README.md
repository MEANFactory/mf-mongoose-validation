# mf-mongoose-validation
Validate extended data types, field lengths, arrays, optional values, and the like.

## Installation ##

    npm install --save mf-mongoose-validation

## Features ##
Additional validation function for primitive data types in Mongoose are:

### Strings ###
| Parameter        | Type    | Explanation      |
|------------------|---------|------------------|
|`validChars`      | String  | Array of allowable characters in value |
|`isCaseSensitive` | Boolean | Determines if the `validChars` are case sensitive |
|`minLength`       | Number  | Minimum length of value **if a value is supplied** and after it is optionally trimmed. |
|`maxLength`       | Number  | Maximum length of value **if a value is supplied** and after it is optionally trimmed. |

### Arrays (Subdocuments) ###
| Parameter       | Type    | Explanation      |
|-----------------|---------|------------------|
|`minQty    `     | Number  | Minimum item count after any soft deletes (see [mf-mongoose-softdelete](https://github.com/MEANFactory/mf-mongoose-softdelete)) |
|`maxQty    `     | Number  | Maximum item count after any soft deletes (see [mf-mongoose-softdelete](https://github.com/MEANFactory/mf-mongoose-softdelete)) |

## Example #1: Primitives ##
Note the uppercase **L** in **Length** used in the plugin.  The built-in Mongoose validator is `minlength` or `maxlength` with all **lowercase** letters.

### Schema ###
```
var mongoose    = require('mongoose'),
    mfValidate = require('mf-mongoose-validation'),
	enums       = require('../enums');

var ALPHA      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DIGITS     = '0123456789';
var NAME_CHARS = ALPHA + ' ';

var personSchema = mongoose.Schema({

   ssn        : {
        type            : String,
        validChars      : DIGITS,
        minLength       : 9,              // plugin version to leverage pleasant error messages
        maxLength       : 9,              // plugin version to leverage pleasant error messages
        trim            : true,
        required        : true,
        },
   firstName  : {
        type            : String,
        validChars      : NAME_CHARS,
        isCaseSensitive : false,
        trim            : true,
        minLength       : 1,               // will only apply if a value is supplied
        maxLength       : 50               // will only apply if a value is supplied
        }
   lastName   : {
        type            : String,
        validChars      : NAME_CHARS,
        isCaseSensitive : false,           // do not consider case when comparing valid characters
        minLength       : 2,
        maxLength       : 50
        },
});
personSchema.plugin(mfValidate);

module.exports = mongoose.model('Person', personSchema);
```


## Example #2: Arrays of Subdocuments ##

### Schema ###
```
var personSchema = mongoose.Schema({
    name: { type: String }
});

var familySchema = mongoose.Schema({
    surname : { type: String },
    members : {
        type   : [ personSchema ],
        minQty : 1,
        maxQty : 100
    }
});

familySchema.plugin(mfValidate);

module.exports = mongoose.model('Family', familySchema.plugin);
```



## Related Projects ##
The following projects have been designed specifically to work with each other:

### [mf-mongoose-audittrail](https://github.com/MEANFactory/mf-mongoose-audittrail)###
Track who and when documents are created and updated without complex programming.  Compare and contract different versions of each document.

### [mf-mongoose-dto](https://github.com/MEANFactory/mf-mongoose-dto) ###
Convert to/from JSON DTO while applying optional level-based hiding.

### [mf-mongoose-softdelete](https://github.com/MEANFactory/mf-mongoose-softdelete) ###
Increase data integrity by retaining historical data and preventing data from being permanently deleted.  Each `delete` operation causes the document to be marked as "deleted" and subsequently hidden from result sets.

### [mf-mongoose-validation](https://github.com/MEANFactory/mf-mongoose-validation) (this plugin)###
Provides additional validation for extended data types, field lengths, arrays, and other useful features.


## Contact Information ##
MEAN Factory  
[support@meanfactory.com](mailto:support@meanfactory.com)  
[www.MEANFactory.com](http://www.MEANFactory.com)  
