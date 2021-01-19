class Book {
  constructor(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  displayBook() {
    let books = document.getElementById("books");
    let card = document.createElement("div");
    card.classList.add("card");
    books.appendChild(card);
    let description = document.createElement("p")
    description.style.cssText = "  grid-column: 2 / 3; grid-row: 1/4"
    description.textContent = `${this.title} written by ${this.author}, has ${this.pages} pages.`
    card.appendChild(description)
    let readP = document.createElement("button");
    readP.classList.add("status")

    if (this.read) {
      readP.textContent = "Read";
      readP.style.backgroundColor = "#52b788"
    } else {
      readP.textContent = "Not Read";
      readP.style.backgroundColor = "#e63946"
    }

    readP.addEventListener("click", () => {
      if (readP.textContent === "Read") {
        readP.textContent = "Not Read";
        readP.style.backgroundColor = "#e63946"
        this.read = false
      } else {
        readP.textContent = "Read";
        readP.style.backgroundColor = "#52b788"
        this.read = true
      }
    })

    card.appendChild(readP);
    deleteCard(card, this)
  }
}

let form = document.getElementById("form")
let myLibrary = []
if (!localStorage.getItem('list')) {
  myLibrary = []
} else {
  setLibrary();
}

function showWindow() {
  let addBookButton = document.getElementById("addBook");
  addBookButton.addEventListener("click", () => {
    form.style.cssText = "display: block";

    closeBtn = document.getElementById("close")
    closeBtn.addEventListener("click", () => { form.style.cssText = "display: none" })
  });
}

function addBookToLibrary() {
  let submitButton = document.getElementById("popUp");
  submitButton.addEventListener("submit", (e) => {
    e.preventDefault()
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");
    myLibrary.push(new Book(title.value, author.value, pages.value, read.checked));
    populateStorage();
    form.style.cssText = "display: none";
    books.innerHTML = "";
    displayAllBooks();
    document.getElementById("popUp").reset()
  });
}

function displayAllBooks() {
  myLibrary.forEach((item) => {
    item.displayBook();
  });
}

function deleteCard(card, book) {
  let deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Remove"
  deleteBtn.classList.add("deleteBtn")
  card.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    let num = myLibrary.indexOf(book)
    myLibrary.splice(num, 1)
    books.innerHTML = ""


    populateStorage()
    displayAllBooks()
  })
}
function setLibrary() {
  objects = JSON.parse(localStorage.getItem("list"))
  objects.forEach(book => {
    book.__proto__ = Object.create(Book.prototype)
    myLibrary.push(book)
  })
}

function populateStorage() {
  localStorage.setItem("list", JSON.stringify(myLibrary))
}
function startLibrary() {
  displayAllBooks()
  addBookToLibrary();
  showWindow();
}
startLibrary()

console.log(Book);