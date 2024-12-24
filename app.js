const API_KEY = 'bcfda9ccca7e18ab16c5e410b5859f23';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Fetch popular movies on load
getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results);
  } catch (err) {
    console.error(err);
  }
}

function displayMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${poster_path ? IMAGE_URL + poster_path : 'https://via.placeholder.com/200x300'}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span>⭐ ${vote_average}</span>
        <p>${release_date || 'Unknown'}</p>
      </div>
    `;
    main.appendChild(movieEl);
  });
}

// Handle search
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;

  if (searchTerm) {
    getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
    searchInput.value = '';
  }
});
