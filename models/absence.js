/**
 * Created by avenuecode on 12/3/14.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var absenceSchema = new Schema({

    'name': { type: String, index: true },

    'date': Date,

    'starts_at': Date,

    'ends_at': Date,

    'unit': String,

    'type': String,

    'deletable': Boolean,

    'editable': Boolean

});

console.log('absenceSchema');
console.log(absenceSchema);

module.exports = mongoose.model('Absence', absenceSchema);


