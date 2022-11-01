const getDay = (timezone) => timezone.slice(0, 10);
const getHour = (timezone) => timezone.slice(11, 16);

module.exports = { getDay, getHour };
