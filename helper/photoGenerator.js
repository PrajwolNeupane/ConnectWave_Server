const photoGenerator = (firstname, lastname) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  var textColor = "000000";
  const r = parseInt(randomColor.slice(0, 2), 16);
  const g = parseInt(randomColor.slice(2, 4), 16);
  const b = parseInt(randomColor.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (luminance > 0.5) {
    textColor = "000000";
  } else {
    textColor = "ffffff";
  }
  return `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=${randomColor}&color=${textColor}`;
};
export default photoGenerator;
