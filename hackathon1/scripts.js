document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('books');
    const searchBar = document.getElementById('search-bar');

    // Load books from the database
    fetchBooks();

    // Handle form submission
    if (bookForm) {
        bookForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(bookForm);
            fetch('insert_book.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                fetchBooks();
                bookForm.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle search input
    if (searchBar) {
        searchBar.addEventListener('input', function (event) {
            const searchQuery = event.target.value;
            fetchBooks(searchQuery);
        });
    }

    // Handle remove request
    bookList.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-request-btn')) {
            const bookID = event.target.dataset.bookId;
            if (confirm("Are you sure you want to request removal of this book?")) {
                fetch('remove_request.php', {
                    method: 'POST',
                    body: new URLSearchParams({
                        book_id: bookID
                    })
                })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    fetchBooks(); // Refresh book list after request
                })
                .catch(error => console.error('Error:', error));
            }
        }
    });

  function fetchBooks(query = '') {
    let url = 'display_books.php';
    if (query) {
        url = `search_books.php?query=${encodeURIComponent(query)}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            bookList.innerHTML = '';
            if (data.length > 0) {
                data.forEach(book => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>Title:</strong> ${book.Title}<br>
                        <strong>Author:</strong> ${book.Author}<br>
                        <strong>Price:</strong> $${book.Price}<br>
                        <strong>Contact:</strong> ${book.ContactInfo}<br>
                        <button class="remove-request-btn" data-book-id="${book.BookID}">Remove Request</button>
                    `;
                    bookList.appendChild(li);
                });
            } else {
                bookList.innerHTML = '<li>No books available.</li>';
            }
        })
        .catch(error => console.error('Error:', error));
}


});
