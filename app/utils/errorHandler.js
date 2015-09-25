module.exports = {
    getKeyErro:    function (error) {
        if (error.code === 11000) {
            var field = error.message.split(".$")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));
            var response = {
              msg: "An document with this " + field + " already exists.",
              fieldName: field
            }
            return response;
        } else {
            return error;
        }
    }
}
