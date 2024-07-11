
// Array of books. Starting w/ 1 pre-filled
const books = [
  {
    id: 1,
    title: "Name of the Wind",
    author: "Patrick Rothfuss",
    read: true,
  },
];

class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read; //boolean
  }
}

class Library {
  constructor(books) {
    this.bookCount = books.length;
    this.books = books; // arr of books
  }
  addBook(book) {
    // Select the inputs from the form if book isn't already created in books array
    if (!book) {
      var title = document.getElementById("title");
      var author = document.getElementById("author");
      var read = document.getElementById("read");
      // Inc Library bookCount by one
      this.nextId++;
      // Create an instance from my Book class with the input values
      var newBook = new Book(
        this.nextId,
        title.value,
        author.value,
        read.checked
      );
      // Push the new book instance into the books array above
      this.books.push(newBook);
    }
    // Handles the DOM
    // Grab the table body to append new rows below
    const tbody = document.getElementById("tableBody");
    // Create new table row
    const newRow = document.createElement("tr");
    // Take the new Book ID and make it a class on the new row
    newRow.classList.add(book ? book.id : newBook.id);
    newRow.addEventListener("dblclick", () => {
      this.removeBook(book ? book.id : newBook.id);
    });

    // Create new table data cells
    const newTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newRead = document.createElement("td");
    // Add text content to table data cells w/ book values
    newTitle.textContent = book ? book.title : newBook.title;
    newAuthor.textContent = book ? book.author : newBook.author;
    // Changing newCheckBox values, type, and checked
    //  Will be diabled if read and won't if haven't
    // Will assign book Id for checking read box later on
    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add(book ? book.id : newBook.id);
    newCheckbox.type = "checkbox";
    newCheckbox.checked = book ? book.read : read.checked;
    newCheckbox.disabled = book ? book.read : read.checked;
    // Add event listener for check this box after added to Library, target is newCheckbox
    newCheckbox.addEventListener("click", (event) => {
      this.markRead(event.target, book ? book.id : newBook.id);
    });

    // Add new checkbox to table data cells
    newRead.appendChild(newCheckbox);

    // Append new cells to new row and new row to table body
    newRow.append(newTitle, newAuthor, newRead);
    tbody.appendChild(newRow);
  }
    // Checkbox still isn't being disabled for some reason 
  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (id == book.id) {
        book.read = true;
        checkbox.disabled = true;
      }
    });
  }

  removeBook(bookId) {
    this.books = this.books.filter(({ id }) => bookId !== id);
    const tbody = document.getElementById("tableBody");
    tbody.removeChild(document.getElementsByClassName(bookId)[0]);
  }
}

const library = new Library(books);
if (books.length > 0) {
  library.books.forEach((book) => {
    library.addBook(book);
  });
}


const form = document.getElementById("form");
// Prevent defaults (page isn't refreshed and data isn't sent to URL)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  library.addBook();
});
