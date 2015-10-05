var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

module.exports = function() {

    var schema = mongoose.Schema({

        cboNumber: {
            type: Number,
        },

        name: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        rg: {
            type: String,
            required: true
        },

        cpf: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },

        dateBirth: {
            type: Date,
            required: true,
            default: Date.now
        },

        siCard: {
            type: Boolean,
            required: true,
            default: Date.now
        },

        siCardNumber: {
            type: Number,
        },

        dateSignup: {
            type: Date,
            required: true,
            default: Date.now
        },

        type: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        club: { type: mongoose.Schema.ObjectId, ref: 'Club' },

        category: { type: mongoose.Schema.ObjectId, ref: 'Category' },

        allergy: []

    });


    schema.plugin(findOrCreate);
    return mongoose.model('User', schema);
}
