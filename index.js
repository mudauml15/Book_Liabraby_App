document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('booksForm');
    const bookList = document.getElementById('booksList');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let editIndex = -1;

    const displayBooks = () => {
        bookList.innerHTML = '';
        books.forEach((book, index) => {
            const bookDiv = document.createElement('div');
            bookDiv.className = `book`;
            bookDiv.innerHTML = `
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Barcode:</strong> ${book.isbn}</p>
                <button onclick="editBook (${index})" class="editB">Edit</button>
                <button onclick="deleteBook(${index})" class="deleteB">Delete</button>
            `;
            bookList.appendChild(bookDiv);
        });
    };

    bookForm.addEventListener('submit', (d) => {
        d.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        // Check for duplicate ISBN
        const errors = books.some(book => book.isbn === isbn);
        if (errors && editIndex === -1) {
            alert("Sorry, the serial number already exists. Try again.");
            return;
        }

        if (editIndex === -1) {
            books.push({ title, author, isbn });
        } else {
            books[editIndex] = { title, author, isbn };
            editIndex = -1;
        }

        localStorage.setItem('books', JSON.stringify(books));
        bookForm.reset();
        displayBooks();
    });

    window.editBook = (index) => {
        const book = books[index];
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        editIndex = index;
    };

    window.deleteBook = (index) => {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    };

    displayBooks();
});


