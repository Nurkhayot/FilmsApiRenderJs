const creator = (creatingElement) => document.createElement(creatingElement);
const setter = (gettingElement) => document.querySelector(gettingElement);

let makeTime = (time) => {
  const day = String(new Date(time).getDate()).padStart(2, "0");
  const month = String(new Date(time).getMonth() + 1).padStart(2, "0");
  const year = new Date(time).getFullYear();

  return day + "." + month + "." + year;
};
