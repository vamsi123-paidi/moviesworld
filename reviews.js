function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    let reviewsCards = document.getElementById("reviewsCards");

    if (reviews.length === 0) {
        reviewsCards.innerHTML = '<p class="text-center text-light" id="no-reviews">No reviews added yet.</p>';
        return;
    }

    reviewsCards.innerHTML = '';

    reviews.forEach(review => {
        let cardHtml = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div class="card reviewCard mx-auto">
                <div class="card-body text-center">
                    <h5 class="card-title">Title: ${review.title}</h5>
                    <p class="card-text">IMDB ID: ${review.imdbid}</p>
                    <p class="card-text">Review: ${review.text}</p>
                    <button class="btn btn-outline-danger remove-review-btn" data-imdbid="${review.imdbid}">Remove from reviews</button>
                </div>
            </div>
        </div>`;
        reviewsCards.innerHTML += cardHtml;
    });

    document.querySelectorAll('.remove-review-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            let imdbid = e.target.getAttribute('data-imdbid');
            removeFromReviews(imdbid);
        });
    });
}

function removeFromReviews(imdbid) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews = reviews.filter(review => review.imdbid !== imdbid);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
}

document.addEventListener('DOMContentLoaded', loadReviews);
