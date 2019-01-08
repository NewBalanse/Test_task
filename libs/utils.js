module.exports.maxLength = function (str, maxLength = 255) {
    if (typeof str !== 'string') {
        return false;
    }

    return str.length <= maxLength;
};
