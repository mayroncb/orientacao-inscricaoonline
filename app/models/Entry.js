var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var mongoose_deleted = require('mongoose-deleted');

var Schema = mongoose.Schema;
module.exports = function() {

  var schema = mongoose.Schema({

      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },

      step: {
        type: mongoose.Schema.ObjectId,
        ref: 'Step',
        required: true
      },

      createdAt: {
          type: Date,
          required: true,
          default: Date.now
      },

      status: {
        type: String,
        default: "Processando"
      },

      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
      },

      value: {
        type: Number,
        required: true
       },

      compNumber: {
        type: Number,
        required: true
       },

      comp: {
        type: mongoose.Schema.ObjectId,
        required: true
      },

      items: {
        type: Array,
        required: true
      },
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Entry', schema);
}
