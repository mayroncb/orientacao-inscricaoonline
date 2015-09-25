

module.exports = {
    generateHash:    function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword:  function(password) {
        return bcrypt.compareSync(password, this.password);
    }

}
 
