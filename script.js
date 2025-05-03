// Load stored reviews on page load
window.addEventListener("DOMContentLoaded", function () {
  populateCountryList();

  const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  storedReviews.forEach((review, index) => {
    addReviewToPage(review.name, review.country, review.rating, review.comment, index);
  });
});

// Dynamically populate country list A–Z
function populateCountryList() {
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba",
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const select = document.getElementById("country");
  countries.sort().forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.appendChild(option);
  });
}

// Add review to page with delete button
function addReviewToPage(name, country, rating, comment, index) {
  const reviewHTML = `
    <div class="review-item" data-index="${index}">
      <strong>${name}</strong> from <em>${country}</em><br />
      <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
      <p class="review-comment">${comment}</p>
      <button class="delete-review">Delete</button>
    </div>
  `;
  document.getElementById("reviews-list").insertAdjacentHTML("beforeend", reviewHTML);
}

// Handle form submit
document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const country = document.getElementById("country").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value.trim();

  if (!name || !country || !rating || !comment) return;

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const newReview = { name, country, rating, comment };
  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  addReviewToPage(name, country, rating, comment, reviews.length - 1);
  document.getElementById("review-form").reset();
});

// Handle delete button clicks
document.getElementById("reviews-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-review")) {
    const reviewItem = e.target.closest(".review-item");
    const index = reviewItem.getAttribute("data-index");

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("reviews-list").innerHTML = "<h2>All Reviews</h2>";
    reviews.forEach((review, idx) => {
      addReviewToPage(review.name, review.country, review.rating, review.comment, idx);
    });
  }
});