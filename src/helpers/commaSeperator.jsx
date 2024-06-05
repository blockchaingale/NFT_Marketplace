function numberWithCommas(x) {
  if (typeof x !== "number") {
    return x;
  }
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var val = Math.round(Number(x) * 100) / 100;

  var parts = val.toString().split(".");

  var num =
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (parts[1] ? "." + parts[1] : "");
  return num;
}

export default numberWithCommas;
