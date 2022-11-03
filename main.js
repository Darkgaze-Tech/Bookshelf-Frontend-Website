document.addEventListener("DOMContentLoaded", init);

function init(){
  var formBook = document.getElementById("inputBook");
  var searchBook = document.getElementById("searchBook");
  formBook.addEventListener("submit", submitBook);
  searchBook.addEventListener("submit", search);

  load();
}

function changeStatus(id, status){
  var books = [];
  if (localStorage.getItem("books") !== null){
    books = JSON.parse(localStorage.getItem("books"));
  }
  if (status === true){
    books[id] = {"id":books[id].id, "title":books[id].title, "author":books[id].author, "year":books[id].year, "isComplete":false};
  }
  else {
    books[id] = {"id":books[id].id, "title":books[id].title, "author":books[id].author, "year":books[id].year, "isComplete":true};
  }
  localStorage.setItem("books", JSON.stringify(books));
  load();

}

function deleteBook(id){
  var books = [];
  if (localStorage.getItem("books") !== null){
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.splice(id,1);

  localStorage.setItem("books", JSON.stringify(books));
  load();
}

function search(){
  var title = document.getElementById("searchBookTitle").value;
  var books = [];
  if (localStorage.getItem("books") !== null){
    books = JSON.parse(localStorage.getItem("books"));
  }
  
  var newBooks = books.filter(book => book.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);

  var id = 0;
  document.getElementById("completeBookshelfList").innerHTML = "";
  document.getElementById("incompleteBookshelfList").innerHTML = "";
  newBooks.forEach(function(book){
    if (book.isComplete === true){
      document.getElementById("completeBookshelfList").innerHTML += 
      `
        <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <div class="action">
          <button class="green" onclick="changeStatus(${id}, ${book.isComplete})">Belum selesai di Baca</button>
          <button class="blue" onclick="edit(${id})">Edit buku</button>
          <button class="red" onclick="deleteBook(${id++})">Hapus buku</button>
        </div>
        </article>
      `;
    }
    if (book.isComplete === false) {
      document.getElementById("incompleteBookshelfList").innerHTML += 
      `
        <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <div class="action">
          <button class="green" onclick="changeStatus(${id}, ${book.isComplete})">Selesai dibaca</button>
          <button class="blue" onclick="edit(${id})">Edit buku</button>
          <button class="red" onclick="deleteBook(${id++})">Hapus buku</button>
        </div>
        </article>
      `;
    }
  });
}

function load(){
  var id = 0;
  var books = [];
  if (localStorage.getItem("books") !== null){
    books = JSON.parse(localStorage.getItem("books"));
  }

  document.getElementById("incompleteBookshelfList").innerHTML = '';
  document.getElementById("completeBookshelfList").innerHTML = '';
  books.forEach(function(book){
    if (book.isComplete === true){
      document.getElementById("completeBookshelfList").innerHTML += 
      `
        <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <div class="action">
          <button class="green" onclick="changeStatus(${id}, ${book.isComplete})">Belum selesai di Baca</button>
          <button class="blue" onclick="edit(${id})">Edit buku</button>
          <button class="red" onclick="deleteBook(${id++})">Hapus buku</button>
        </div>
        </article>
      `;
    }
    if (book.isComplete === false) {
      document.getElementById("incompleteBookshelfList").innerHTML += 
      `
        <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <div class="action">
          <button class="green" onclick="changeStatus(${id}, ${book.isComplete})">Selesai dibaca</button>
          <button class="blue" onclick="edit(${id})">Edit buku</button>
          <button class="red" onclick="deleteBook(${id++})">Hapus buku</button>
        </div>
        </article>
      `;
    }
  });
}

function submitBook(event){
    var title = document.getElementById("inputBookTitle").value;
    var author = document.getElementById("inputBookAuthor").value;
    var year = document.getElementById("inputBookYear").value;
    var isComplete = document.getElementById("inputBookIsComplete").checked;
    
    var books = [];
    if (localStorage.getItem("books") !== null){
      books = JSON.parse(localStorage.getItem("books"));
    }

    bookObject = {"id":+new Date(), "title":title, "author":author, "year":year, "isComplete":isComplete};
    books.push(bookObject);

    localStorage.setItem("books", JSON.stringify(books));
    load();
}

function edit(id) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  var books = [];
  if (localStorage.getItem("books") !== null){
    books = JSON.parse(localStorage.getItem("books"));
  }
  var editContent = document.getElementById("editContent");
  var checked = books[id].isComplete === true ? "checked" : "";
  editContent.innerHTML = 
  `
  <section class="input_section">
    <form id="editBook" onsubmit="submitEditBook(${id})">
      <div class="input">
        <label for="editBookID">ID</label>
        <input id="editBookID" value="${books[id].id}" type="text" required disabled>
      </div>
      <div class="input">
        <label for="editBookTitle">Judul</label>
        <input id="editBookTitle" value="${books[id].title}" type="text" required>
      </div>
      <div class="input">
        <label for="editBookAuthor">Penulis</label>
        <input id="editBookAuthor" value="${books[id].author}" type="text" required>
      </div>
      <div class="input">
        <label for="editBookYear">Tahun</label>
        <input id="editBookYear" value="${books[id].year}" type="number" required>
      </div>
      <div class="input_inline">
        <label for="editBookIsComplete">Selesai dibaca</label>
        <input id="editBookIsComplete" type="checkbox" ${checked}>
      </div>
      <button id="bookSubmitEdit" type="submit">Edit Buku ke rak <span>Belum selesai dibaca</span></button>
    </form>
  </section>
  `;
}

function submitEditBook(id_position){
    var id = document.getElementById("editBookID").value;
    var title = document.getElementById("editBookTitle").value;
    var author = document.getElementById("editBookAuthor").value;
    var year = document.getElementById("editBookYear").value;
    var isComplete = document.getElementById("editBookIsComplete").checked;
    
    var books = [];
    if (localStorage.getItem("books") !== null){
      books = JSON.parse(localStorage.getItem("books"));
    }

    books[id_position] = {"id":id, "title":title, "author":author, "year":year, "isComplete":isComplete};

    localStorage.setItem("books", JSON.stringify(books));
    load();
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}