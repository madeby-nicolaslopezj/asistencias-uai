getCurrentModule = function() {
  if (moment().isBefore(moment().hour(9).minute(50))) {
    return 1;
  }
  if (moment().isBefore(moment().hour(11).minute(20))) {
    return 2;
  }
  if (moment().isBefore(moment().hour(12).minute(50))) {
    return 3;
  }
  if (moment().isBefore(moment().hour(14).minute(50))) {
    return 4;
  }
  if (moment().isBefore(moment().hour(16).minute(20))) {
    return 5;
  }
  if (moment().isBefore(moment().hour(17).minute(50))) {
    return 6;
  }
  if (moment().isBefore(moment().hour(19).minute(20))) {
    return 7;
  }
  return 8;
}