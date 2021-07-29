let elList = setter(".list");
let elSelect = setter(".form__select-js");

function renderGenresFunc(action, listName) {
  let newGenreLi = creator("li");
  newGenreLi.textContent = action;
  listName.appendChild(newGenreLi);
}

renderGenresSelect(films, elSelect);
function renderGenresSelect(something, element) {
  let result = [];
  something.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!result.includes(genre)) {
        result.push(genre);
      }
    });
  });

  element.innerHTML = null;

  result.forEach((genre) => {
    const genreOption = creator("option");
    genreOption.value = genre.toLowerCase();
    genreOption.textContent = genre;
    element.appendChild(genreOption);
  });
}

let arrayFunc = (films) => {
  films.forEach((film) => {
    //creating...
    let newLi = creator("li");
    let newImg = creator("img");
    let newTitle = creator("h2");
    let newOverview = creator("p");
    let readMore = creator("p");
    let newTime = creator("time");
    let newGenresList = creator("ul");

    film.genres.forEach((genre) => {
      renderGenresFunc(genre, newGenresList);
    });

    //setting...
    newLi.setAttribute("class", "list__item");
    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("alt", film.title);
    newImg.setAttribute("width", 150);
    newImg.setAttribute("height", 200);
    newTitle.setAttribute("class", "names");
    newOverview.setAttribute("class", "overview");
    newTime.setAttribute("class", "time");
    newTime.setAttribute("datetime", "film.release_date");

    //texting
    newTitle.textContent = film.title;
    readMore.textContent = "read more";
    newOverview.textContent =
      film.overview.split(" ").slice(0, 20).join(" ") + "...";
    newTime.textContent = makeTime(film.release_date);

    //styling
    newOverview.style.textAlign = "right";
    readMore.style.fontStyle = "italic";
    readMore.style.fontSize = "13px";
    readMore.style.marginLeft = "100px";
    readMore.style.color = "rgba(0, 31, 63, .4)";
    readMore.style.cursor = "pointer";
    readMore.style.textDecoration = "underline";
    newGenresList.style.marginTop = "30px";
    newGenresList.style.textAlign = "left";
    newGenresList.style.marginLeft = "20px";

    //appendding...
    elList.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newTitle);
    newLi.appendChild(newOverview);
    newLi.appendChild(readMore);
    newLi.appendChild(newTime);
    newLi.appendChild(newGenresList);
  });
};

elList.innerHTML = null;
arrayFunc(films);
