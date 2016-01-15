var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {

    var schema = mongoose.Schema({
        UF: {
            type: String,
        },

        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },

        admin: {
            type: Schema.ObjectId, ref: 'User'
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },

    });

    return mongoose.model('Club', schema);


}
