var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = function() {

    var schema = mongoose.Schema({

        cboNumber: {
            type: Number
        },

        isFirstEntry: {
            type: Boolean,
            default: true
        },

        isClubAutorization: {
            type: Boolean,
            default: false
        },

        isCbo: {
            type: Boolean,
            required: true,
            default: false
        },

        genre: {
            type: Boolean,
            required: true
        },

        uf: {
            type: String,
            required: true
        },

        name: {
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
            default: false
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

        allergy: [],

        isActive: {
          type: Boolean,
          default: true
        }
    });


    schema.plugin(findOrCreate);
    schema.plugin(deepPopulate);
    return mongoose.model('User', schema);
}
