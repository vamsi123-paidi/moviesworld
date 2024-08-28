function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));    
    let favoritesCards = document.getElementById("favoritesCards");

    if (favorites.length === 0) {
        favoritesCards.innerHTML = '<p class="text-center text-light" id="no-favorite">No favorite movies yet.</p>';
        return;
    }

    favoritesCards.innerHTML = '';

    favorites.forEach(movie => {
        let cardHtml = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div class="card movieCard mx-auto">
                <div class="card-body text-center">
                    <img src="${movie.poster}" alt="movie poster" class="moviePoster mb-2">
                    <h5 class="card-title">Title: ${movie.title}</h5>
                    <p class="card-text">Movie Year: ${movie.year}</p>
                    <p class="card-text">IMDB ID: ${movie.imdbid}</p>
                    <button class="btn btn-outline-danger remove-fav-btn" data-imdbid="${movie.imdbid}">Remove from Favorites</button>
                </div>
            </div>
        </div>`;
        favoritesCards.innerHTML += cardHtml;
    });

    document.querySelectorAll('.remove-fav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            let imdbid = e.target.getAttribute('data-imdbid');
            removeFromFavorites(imdbid);
        });
    });
}

function removeFromFavorites(imdbid) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.imdbid !== imdbid);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

document.addEventListener('DOMContentLoaded',loadFavorites);