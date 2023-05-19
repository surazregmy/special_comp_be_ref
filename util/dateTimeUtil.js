const getDateDifference = (date1, date2) => {
  // convert the dates to milliseconds
  let date1Ms = date1.getTime();
  let date2Ms = date2.getTime();

  // calculate the difference in milliseconds
  let differenceMs = Math.abs(date1Ms - date2Ms);

  // convert the difference from milliseconds to hours
  return differenceMs / (1000 * 60 * 60);
};

module.exports = { getDateDifference };
