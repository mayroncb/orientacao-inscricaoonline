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
      deleted: {
        type: Boolean
      }
  });
  // schema.plugin(findOrCreate);
  schema.plugin(mongoose_deleted, { select : false });
  schema.index({name: 1, deleted: -1}, {unique: true});
  return mongoose.model('Competition', schema);
}
