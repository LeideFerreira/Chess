
const toLower = function(value) {
        return value.toLowerCase();
        }
        const toUpper = function(value) {
        return value.toUpperCase();
        }
const showError = function (errors, field) {
    var mensagem;
    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            if (error.path == field) {
                mensagem = error.message;
                return;
            }
        });
        return mensagem;
    }
}

module.exports = { toLower, toUpper ,showError};