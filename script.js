document.addEventListener('DOMContentLoaded', () => {
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
            data.Search.forEach((movie, i) => {
                let { Title, Year, imdbID, Poster } = movie;

                let cardHtml = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                    <div class="card movieCard mx-auto">
                        <div class="card-body text-center">
                            <img src="${Poster}" alt="movie poster" class="moviePoster mb-2" id="movieImg">
                            <h5 class="card-title">Title: ${Title}</h5>
                            <p class="card-text">Movie Year: ${Year}</p>
                            <p class="card-text">IMDB ID: ${imdbID}</p>
                            <div class="ratings">
                                <div class="stars" data-title="${Title}">
                                    <input type="radio" name="rating_${i}" id="star5_${i}" value="5">
                                    <label for="star5_${i}">★</label>
                                    <input type="radio" name="rating_${i}" id="star4_${i}" value="4">
                                    <label for="star4_${i}">★</label>
                                    <input type="radio" name="rating_${i}" id="star3_${i}" value="3">
                                    <label for="star3_${i}">★</label>
                                    <input type="radio" name="rating_${i}" id="star2_${i}" value="2">
                                    <label for="star2_${i}">★</label>
                                    <input type="radio" name="rating_${i}" id="star1_${i}" value="1"> 
                                    <label for="star1_${i}">★</label>
                                </div>
                            </div>
                            <div class="ratingValueAfter"></div>
                            <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#myModal_${i}">Add Review</button>
                            <button class="btn btn-outline-warning fav-btn" data-title="${Title}" data-year="${Year}" data-imdbid="${imdbID}" data-poster="${Poster}" type="button">Add to Favorites</button>
                        </div>
                    </div>
                </div> 
                <div id="myModal_${i}" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" id="close-mark" data-bs-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add Review for ${Title}</h4>
                            </div>
                            <div class="modal-body">
                                <textarea id="review-text_${i}" class="review-text" name="review" rows="4" cols="50">
                                   Add your valuable review here.
                                </textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-danger reviewSubmit" data-title="${Title}" data-imdbid="${imdbID}" data-textareaid="review-text_${i}" data-bs-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>`;

                movieCards.innerHTML += cardHtml;
            });

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

            document.querySelectorAll('.reviewSubmit').forEach(button => {
                button.addEventListener('click', (e) => {
                    let reviewDetails = {
                        title: e.target.getAttribute('data-title'),
                        imdbid: e.target.getAttribute('data-imdbid'),
                        text: document.getElementById(e.target.getAttribute('data-textareaid')).value.trim()
                    };
                    addToReviews(reviewDetails);
                });
            });

            document.querySelectorAll('.stars input').forEach(star => {
                star.addEventListener('change', (e) => {
                    let ratingValue = e.target.value;
                    let dataTitle = e.target.closest('.stars').getAttribute('data-title');
                    alert(`You have given ${ratingValue} stars to ${dataTitle}`);
                });
            });

        } catch {
            alert("Please check your spelling or enter a movie name.");
        }
    }

    function addToFavorites(movie) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.title} has been added to your favorites!`);
    }

    function addToReviews(review) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        alert(`Check your review of ${review.title} on the review page!`);
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
