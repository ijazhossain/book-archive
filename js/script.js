const errorMsg = document.getElementById('err-msg');
//------------- handle search button-----------
const searchBook = () => {
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  if (!searchText) {
    errorMsg.innerHTML = 'Enter book name';
    return;
  }

  errorMsg.innerHTML = '';
  // ----------load data----------
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displaySearchResult(data)
    });
};

// ----------display search result data----------
const displaySearchResult = (myBooks) => {
  // console.log(myBooks);
  const searchResult = document.getElementById("search-result");
  const bookCount = document.getElementById("book-num");
  searchResult.innerText = "";

  bookCount.innerHTML = `<h2 class="text-center my-4 text-warning"
  >Total books found ${myBooks.numFound}</h2>`;



  myBooks.docs.slice(0, 15).forEach((book) => {
    console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title"> Name: ${book.title}</h5>
              <h6> Author: ${book.author_name}</h6>
              <p>Publisher: <small> ${book?.publisher ? book?.publisher[0] : 'Not found'} </small></p>
              <small> First Published Year: ${book.first_publish_year}</small>
            </div>
        </div>
        `;
    searchResult.appendChild(div);
  });
};
