/**
 *
 * @param {string} time
 * @returns {boolean}
 *
 */

const validateTime = (time) => {
    const regex = /^(1[012]|[1-9]|0[1-9]):[0-5][0-9](\s)(am|pm)$/i;
    const result = regex.test(time);
    return result;
};

module.exports = validateTime;
