var bcrypt   = require('bcrypt-nodejs');

module.exports = {
    generateHash:    function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword:  function(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

}
