function addBook() {
    let table = document.getElementById("table");
    let bookName = document.getElementById("Title").value;
    let Author = document.getElementById("Author").value;
    let genre = document.getElementById("genre").value;
    let status = document.getElementById("status").value;
    let rating = document.getElementById("rating").value;

    if (bookName === "" || Author === "" || genre === "" || rating === "") {
        return;
    }

    let row = table.insertRow();
    
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();

    cell1.innerHTML = bookName;
    cell2.innerHTML = Author;
    cell3.innerHTML = genre;

    let select = document.createElement("select");

    ["To Read", "In Progress", "Completed"].forEach(optionStatus => {
        let option = document.createElement("option");
        option.value = optionStatus;
        option.textContent = optionStatus;
        
        if (optionStatus.toLowerCase() === status.toLowerCase()) {
            option.selected = true;
            
            if (optionStatus === "Completed") {
                playSound();
            }
        }
        select.appendChild(option);
    });
    

    select.addEventListener("change", function () {
        if (this.value === "Completed" 
            || this.value === "completed"
        ) {
            playSound();
        }
    });

    cell4.appendChild(select);
    cell5.innerHTML = rating;
    
    document.getElementById("Title").value = "";
    document.getElementById("Author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "";
    document.getElementById("rating").value = "";
}
let books = [
    { name: "The Amazing Spider-Man", Author: "Stan Lee", genre: "Superhero", status: "Completed", rating: "5" },
    { name: "Iron Man: Extremis", Author: "Warren Ellis", genre: "Sci-Fi/Action", status: "In Progress", rating: "4" },
    { name: "Thor: God of Thunder", Author: "Jason Aaron", genre: "Mythology/Fantasy", status: "To Read", rating: "3" },
    { name: "Black Panther: A Nation Under Our Feet", Author: "Ta-Nehisi Coates", genre: "Action/Adventure", status: "Completed", rating: "5" },
    { name: "X-Men: Dark Phoenix Saga", Author: "Chris Claremont", genre: "Sci-Fi/Mutants", status: "In Progress", rating: "4" },
    { name: "Captain America: The Winter Soldier", Author: "Ed Brubaker", genre: "Espionage/Action", status: "Completed", rating: "5" },
    { name: "Doctor Strange: The Oath", Author: "Brian K. Vaughan", genre: "Magic/Fantasy", status: "To Read",  rating: "3" },
    { name: "Hulk: Planet Hulk", Author: "Greg Pak", genre: "Sci-Fi/Action", status: "In Progress", rating: "4" },
];

function displayBooks() {
    let table = document.getElementById("table");
    books.forEach((book, index) => {
        let row = table.insertRow();
        row.classList.add("books");
        row.insertCell(0).textContent = book.name;
        row.insertCell(1).textContent = book.Author;
        row.insertCell(2).textContent = book.genre;
        
        let select = document.createElement("select");
        select.name = `status-${index}`;
        select.id = `status-${index}`;

        ["To Read", "In Progress", "Completed"].forEach(status => {
            let option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (book.status === status) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        select.addEventListener("change", function () {
            books[index].status = this.value;
        
            if (this.value === "Completed") {
                playSound(); 
            }
        });

        let statusCell = row.insertCell(3);
        statusCell.appendChild(select);

        row.insertCell(4).textContent = book.rating;
    });
}


function deleteBook(){
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");
    let deleteBook = document.getElementById("delete").value.trim().toLowerCase();

    for (let i = rows.length - 1; i > 0; i--) {
        let cell = rows[i].getElementsByTagName("td")[0];
        if (cell && cell.textContent.trim().toLowerCase() === deleteBook) {
            table.deleteRow(i);
            break;
        }
    }
    
}
function searchBook() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let rows = document.getElementById("table").getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) { 
        let titleCell = rows[i].getElementsByTagName("td")[0];
        if (titleCell) {
            let textValue = titleCell.textContent || titleCell.innerText;
            rows[i].style.display = textValue.toLowerCase().includes(input) ? "" : "none";
        }
    }
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

function playSound() {
    let audio = new Audio('sounds.mp3');
    audio.play();
}

displayBooks();

