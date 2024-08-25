document.addEventListener('DOMContentLoaded',()=> {
let searchInput = document.getElementById('Search_input');
let searchBtn = document.getElementById("search_btn");
let apiKey = "e2e1750c";
let movieUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&page=1&s=';

async function movieData(movie) {
    try {
        let response = await fetch(movieUrl + movie);
        let data = await response.json();
        let movieCards = document.getElementById("movieCards").querySelector(".row");
        movieCards.innerHTML = '';
        for (let i = 0; i < data.Search.length; i++) {
            let title = data.Search[i].Title;
            let year = data.Search[i].Year;
            let imdbid = data.Search[i].imdbID;
            let poster = data.Search[i].Poster;

            let cardHtml = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                <div class="card movieCard mx-auto">
                    <div class="card-body text-center">
                        <img src="${poster}" alt="movie poster" class="moviePoster mb-2" id="movieImg">
                        <h5 class="card-title">Title: ${title}</h5>
                        <p class="card-text">Movie Year: ${year}</p>
                        <p class="card-text">IMDB ID: ${imdbid}</p>
                        <button class="btn btn-outline-danger fav-btn" data-title="${title}" data-year="${year}" data-imdbid="${imdbid}" data-poster="${poster}" type="button">Add to Favorites</button>
                    </div>
                </div>
            </div>`;
            movieCards.innerHTML += cardHtml;
        }

        document.querySelectorAll('.fav-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                let movieDetails = {
                    title: e.target.getAttribute('data-title'),
                    year: e.target.getAttribute('data-year'),
                    imdbid: e.target.getAttribute('data-imdbid'),
                    poster: e.target.getAttribute('data-poster')
                };
                addToFavorites(movieDetails);
            });
        });

    } catch {
        alert("Please check your spell or enter a movie name.");
    }
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${movie.title} has been added to your favorites!`);
}

async function defaultMovies() {
    let defaultMovies = ["Avengers"];
    for (let movie of defaultMovies) {
        await movieData(movie);
    }
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let movie = searchInput.value.trim();
    if (movie) {
        movieData(movie);
    } else {
        alert('Please enter a movie name to search');
    }
});

window.onload = defaultMovies;
});

