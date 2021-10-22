showNotes();

// Adding node to localstorage
document.getElementById("addBtn").addEventListener("click", function (e) {
  let noteTitle = document.getElementById("addTitle");
  let note = document.getElementById("addTxt");
  let imp = document.getElementById("important");

  let notesTitle = localStorage.getItem("notesTitle");
  let notes = localStorage.getItem("notes");
  let imps = localStorage.getItem("imp");

  if (noteTitle.value.length != 0) {
    let notesTitleObj = [];
    let notesObj = [];
    let impObj = [];

    if (notesTitle != null) {
      notesTitleObj = JSON.parse(notesTitle);
      notesObj = JSON.parse(notes);
      impObj = JSON.parse(imps);
    }
    notesTitleObj.push(noteTitle.value);
    notesObj.push(note.value);
    if (imp.checked) impObj.push("on");
    else impObj.push("off");

    localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("imp", JSON.stringify(impObj));

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
  let notesTitle = localStorage.getItem("notesTitle");
  let imps = localStorage.getItem("imp");

  let notesObj = [];
  let notesTitleObj = [];
  let impObj = [];

  if (notesTitle != null) {
    notesTitleObj = JSON.parse(notesTitle);
    notesObj = JSON.parse(notes);
    impObj = JSON.parse(imps);
  }

  let html = "";
  for (let i = 0; i < notesTitleObj.length; i++) {
    if (impObj[i] == "on") {
      html += `
      <div class="noteCard mx-2 my-2 card" style="width: 18rem">
      <div class="card-body">
        <h4 class="card-title">⭐ ${notesTitleObj[i]}</h4>
        <p class="card-text">${notesObj[i]}</p>
        <button id="${i}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>
      `;
    }
  }

  for (let i = 0; i < notesTitleObj.length; i++) {
    if (impObj[i] != "on") {
      html += `
      <div class="noteCard mx-2 my-2 card" style="width: 18rem">
      <div class="card-body">
        <h4 class="card-title">${notesTitleObj[i]}</h4>
        <p class="card-text">${notesObj[i]}</p>
        <button id="${i}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>
      `;
    }
  }

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
  let notesTitle = localStorage.getItem("notesTitle");
  let imps = localStorage.getItem("imp");

  let notesObj = [];
  let notesTitleObj = [];
  let impObj = [];

  if (notesTitle != null) {
    notesTitleObj = JSON.parse(notesTitle);
    notesObj = JSON.parse(notes);
    impObj = JSON.parse(imps);
  }

  notesObj.splice(index, 1);
  notesTitleObj.splice(index, 1);
  impObj.splice(index, 1);
  localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("imp", JSON.stringify(impObj));
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
