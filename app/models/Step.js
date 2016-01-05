var mongoose = require('mongoose');
// var findOrCreate = require('mongoose-findorcreate')
var mongoose_deleted = require('mongoose-deleted');

var Schema = mongoose.Schema;
module.exports = function() {

  var schema = mongoose.Schema({
      name: {
          type: String,
          required: true,
      },

      createdAt: {
          type: Date,
          required: true,
          default: Date.now
      },

      entryStartDate: {
          type: Date,
          required: true
      },

      entryEndDate: {
          type: Date,
          required: true
      },

      stepDate: {
          type: Date,
          required: true
      },

      isActive: {
        type: Boolean,
        default: false
      },

      entryValue: {
        type: Number,
        required: true
       },

      siCardValue: {
        type: Number,
        required: true
       },

      annuityValue: {
        type: Number,
        required: true
       },

      deleted: {
        type: Boolean
      },

      competition: {
        type: mongoose.Schema.ObjectId, ref: 'Competition',
        required: true
      },

      club: {
        type: mongoose.Schema.ObjectId, ref: 'Club',
        required: true
      },
  });
  // schema.plugin(findOrCreate);
  schema.plugin(mongoose_deleted, { select : false });
  schema.index({name: 1, competition: 1, deleted: -1}, {unique: true});
  return mongoose.model('Step', schema);
}
