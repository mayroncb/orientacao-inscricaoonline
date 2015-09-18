var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },

        info: {
            type: String
        }
    });
    return mongoose.model('Category', schema);

}
