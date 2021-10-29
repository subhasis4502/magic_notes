showNotes();

// Adding node to localstorage
document.getElementById("addBtn").addEventListener("click", function (e) {
  let noteTitle = document.getElementById("addTitle");
  let note = document.getElementById("addTxt");
  let imp = document.getElementById("important");

  let notes = localStorage.getItem("notes");

  if (noteTitle.value.length != 0) {
    let notesObj = [];

    if (notes != null) {
      notesObj = JSON.parse(notes);
    }

    let myObj = {
      title: noteTitle.value,
      note: note.value,
      imp: imp.checked ? "on" : "off",
    };

    notesObj.push(myObj);

    localStorage.setItem("notes", JSON.stringify(notesObj));

    noteTitle.value = "";
    note.value = "";
    imp.checked = false;

    showNotes();
  } else {
    alert("The note is empty");
  }
});

function showNotes() {
  let notes = localStorage.getItem("notes");

  let notesObj = [];

  if (notes != null) {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    if (element.imp == "on") {
      html += `
      <div class="noteCard mx-2 my-2 card" style="width: 18rem">
      <div class="card-body">
        <h4 class="card-title">⭐ ${element.title}</h4>
        <p class="card-text">${element.note}</p>
        <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>
      `;
    }
  });

  notesObj.forEach(function (element, index) {
    if (element.imp == "off") {
      html += `
      <div class="noteCard mx-2 my-2 card" style="width: 18rem">
      <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
        <p class="card-text">${element.note}</p>
        <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>
      `;
    }
  });

  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) noteElm.innerHTML = html;
  else {
    noteElm.innerHTML = `
        <h3>No notes to show</h3>
      `;
  }
}

//Function to delete notes:
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj = [];

  if (notes != null) {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//Implementing search operation
document.getElementById("searchTxt").addEventListener("input", function () {
  let inputVal = this.value;
  // console.log(inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTitle = element.getElementsByTagName("h4")[0].innerText;
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (
      cardTxt.includes(inputVal.toLowerCase()) ||
      cardTitle.includes(inputVal.toLowerCase())
    )
      element.style.display = "block";
    else element.style.display = "none";
  });
});
