let searchInput = document.getElementById('Search_input');
let searchBtn = document.getElementById("search_btn")
let apiKey = "e2e1750c";
let movieUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&page=1&s=';
async function movieData(movie) {
    try {
        let response = await fetch(movieUrl + movie)
        let data = await response.json();
        // console.log(data);
        let movieCards = document.getElementById("movieCards").querySelector(".row");
        movieCards.innerHTML = ''
        for (let i = 0; i < data.Search.length; i++) {
            let title = data.Search[i].Title;
            let year = data.Search[i].Year;
            let imdbid = data.Search[i].imdbID;
            let poster = data.Search[i].Poster;
            // console.log(title);
            // console.log(year);
            // console.log(imdbid);
            movieCards.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                <div class="card movieCard mx-auto">
                    <div class="card-body text-center">
                        <img src="${poster}" alt="movie poster" class="moviePoster mb-2" id="movieImg">
                        <h5 class="card-title">Title :${title}</h5>
                        <p class="card-text">Movie Year :${year}</p>
                        <p class="card-text">IMDB ID :${imdbid}</p>
                        <button class="btn btn-outline-danger" id="fav_btn" type="submit">Add to Favroites</button>
                    </div>
                </div>
            </div>`;
        }

    }
    catch {
        alert("Please check your spell or enter movie name.");
    }
}
async function defaultMovies() {
    let defaultMovies = ["Avengers"];
    for (let movie of defaultMovies) {
        await movieData(movie);
    }
}

searchBtn.addEventListener("click", (e) => {
    try {
        e.preventDefault();
        let movie = searchInput.value.trim();
        movieData(movie)
    }
    catch {
        alert('please enter movie name to search')
    }
})

window.onload = defaultMovies