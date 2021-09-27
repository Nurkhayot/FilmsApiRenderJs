const elMoviesList = selectElement('.movies__list');
const elBookmarksList = selectElement('.bookmarks__list');
const elMovieTemplate = selectElement('#movie__template').content;

// Modal
const elModal = selectElement('.modal');
const elModalDescription = selectElement('.modal__description');
const elModalCloseBtn = selectElement('.modal__close-btn');

// Form elements
const elForm = selectElement('.movies__form');
const elInputSearch = selectElement('.movies__form__input', elForm);
const elSelectGenres = selectElement('.movies__form__select-genre', elForm);
const elSelectSort = selectElement('.movies__form__select-sort', elForm);

// Listen elModal's click
elModal.addEventListener('click', (evt) => {
	if (evt.target.matches('.modal__close-btn')) {
		elModal.classList.remove('modal--open');
	}

	if (evt.target.matches('.modal')) {
		elModal.classList.remove('modal--open');
	}
});

// Bookmarks
const bookmarksArr = JSON.parse(window.localStorage.getItem('bookmarks')) || [];

// Render Bookmarks

function renderBookMarks(arr, element) {
	element.innerHTML = null;

	arr.forEach((film) => {
		const newLi = createDOM('li');
		newLi.textContent = film.title;

		element.appendChild(newLi);
	});
}

// Render genres
function renderGenres(films, element) {
	const result = [];

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!result.includes(genre)) {
				result.push(genre);
			}
		});
	});

	result.forEach((genre) => {
		const newOption = createDOM('option');
		newOption.value = genre;
		newOption.textContent = genre;

		element.appendChild(newOption);
	});
}

elMoviesList.addEventListener('click', (evt) => {
	if (evt.target.matches('.movie__bookmark-btn')) {
		const filmId = evt.target.dataset.film_id;

		const foundFilm = films.find((film) => film.id == filmId);

		let doesExist = false;

		bookmarksArr.forEach((bookmark) => {
			if (bookmark.id === foundFilm.id) {
				doesExist = true;
			}
		});

		if (!doesExist) {
			bookmarksArr.push(foundFilm);
			window.localStorage.setItem('bookmarks', JSON.stringify(bookmarksArr));
			renderBookMarks(bookmarksArr, elBookmarksList);
		}
	}
});

// Rendering movies function
function renderMovies(filmsArr, element) {
	element.innerHTML = null;

	filmsArr.forEach((film) => {
		const movieTemplate = elMovieTemplate.cloneNode(true);

		selectElement('.movie__img', movieTemplate).setAttribute(
			'src',
			film.poster,
		);

		selectElement('.movie__heading', movieTemplate).textContent = film.title;

		selectElement('.movie__date', movieTemplate).textContent = normalizeDate(
			film.release_date,
		);

		selectElement('.movie__date', movieTemplate).setAttribute(
			'datetime',
			normalizeDate(film.release_date),
		);

		const elMoreBtn = selectElement('.movie__more-btn', movieTemplate);
		const elBookmarkBtn = selectElement(
			'.movie__bookmark-btn',
			movieTemplate,
		);

		elMoreBtn.dataset.film_id = film.id;
		elBookmarkBtn.dataset.film_id = film.id;

		elMoreBtn.addEventListener('click', (evt) => {
			const filmId = evt.target.dataset.film_id;
			elModal.classList.add('modal--open');

			const foundfilm = filmsArr.find((item) => item.id === filmId);
			elModalDescription.textContent = foundfilm.overview;
		});

		element.appendChild(movieTemplate);
	});
}

// Sort function
function sortFilms(filmsArr, format) {
	const sortedAlp = filmsArr.sort((a, b) => {
		if (a.title > b.title) {
			return 1;
		} else if (a.title < b.title) {
			return -1;
		} else {
			return 0;
		}
	});

	const sortedDate = filmsArr.sort((a, b) => a.release_date - b.release_date);

	if (format === 'a_z') {
		return sortedAlp;
	} else if (format === 'z_a') {
		return sortedAlp.reverse();
	} else if (format === 'new_old') {
		return sortedDate;
	} else if (format === 'old_new') {
		return sortedDate.reverse();
	}
}

// Filter Form
elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const inputSearchValue = elInputSearch.value.trim();
	const selectGenres = elSelectGenres.value.trim();
	const sortValue = elSelectSort.value.trim();

	const regex = new RegExp(inputSearchValue, 'gi');

	const searchedFilms = films.filter((film) => film.title.match(regex));

	let filteredByGenres = [];
	if (selectGenres === 'All') {
		filteredByGenres = searchedFilms;
	} else {
		filteredByGenres = searchedFilms.filter((film) =>
			film.genres.includes(selectGenres),
		);
	}

	const sortedFilms = sortFilms(filteredByGenres, sortValue);

	renderMovies(sortedFilms, elMoviesList);
});

// Render
renderGenres(films, elSelectGenres);
renderMovies(films, elMoviesList);
renderBookMarks(bookmarksArr, elBookmarksList);
