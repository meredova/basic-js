const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date) {
    throw new Error('Invalid date!');
  }

  try {
    const month = date.getMonth();

    if (isNaN(month) || !isFinite(month)) {
      throw new Error('Invalid date!');
    }

    switch (true) {
      case month >= 0 && month <= 1 || month === 11:
        return 'winter';
      case month >= 2 && month <= 4:
        return 'spring';
      case month >= 5 && month <= 7:
        return 'summer';
      case month >= 8 && month <= 10:
        return 'autumn';
      default:
        throw new Error('Invalid date!');
    }
  } catch (error) {
    throw new Error('Invalid date!');
  }
}


module.exports = {
  getSeason
};
