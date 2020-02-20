// Book Class: Represents a Book
class Book {
  constructor(
    title,
    author,
    publicationYear,
    genres,
    pages,
    mediaType,
    rating,
    status,
    note
  ) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.genres = genres;
    this.pages = pages;
    this.mediaType = mediaType;
    this.ratings = ratings;
    this.status = status;
    this.note = note;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const StoredBooks = ""; //check later
    const books = StoredBooks;

    books.forEach(book => UI.addBookToList());
  }

  static addBookToList() {
    const list = document.querySelector("#book-llist");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publicationYear}</td>
            <td>${book.genres}</td>
            <td>${book.pages}</td>
            <td>${book.mediaType}</td>
            <td>${book.ratings}</td>
            <td>${book.status}</td>
            <td>${book.note}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = "alert alert-${className}";
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#publicationYear").value = "";
    document.querySelector("#genres").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#mediaType").value = "";
    document.querySelector("#ratings").value = "";
    document.querySelector("#status").value = "";
    document.querySelector("#note").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks(book) {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }
  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  // check and modify this
  static removeBooks(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener("DOMContenLoaded", UI.displayBooks);

//Evet: Add a Book
document.querySelector("#book-form").addEventListener("submit", e => {
  //Prevant actual submit
  e.preventDefault();

  //Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const publicationYear = document.querySelector("#publicationYear").value;
  const genres = document.querySelector("#genres").value;
  const pages = document.querySelector("#pages").value;
  const mediaType = document.querySelector("#mediaType").value;
  const ratings = document.querySelector("#ratings").value;
  const status = document.querySelector("#status").value;
  const note = document.querySelector("#note").value;

  // Validate
  if (
    title === "" ||
    author === "" ||
    publicationYear === "" ||
    genres === "" ||
    pages === "" ||
    mediaType === "" ||
    ratings === "" ||
    status === "" ||
    note === ""
  ) {
    UI.showAlert("Plear fill in all fields", "danger");
  } else {
    //Instatiate book
    const book = new Book(
      title,
      author,
      publicationYear,
      genres,
      pages,
      mediaType,
      status,
      note
    );

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBooks(book);

    //SHow sucess message
    UI.showAlert("Book Added", "success");

    // Clear Field
    UI.clearField();
  }
});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", e => {
  // Remove book from UI
  UI.displayBooks(e.target);

  // Remove book from store
  Store.removeBooks(e.target.parentElement.previousElementSiblings.textContent);

  //Show sucess message
  UI.showAlert("Book Removed", "success");
});
