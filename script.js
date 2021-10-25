const form = document.querySelector("form");
const arrayLocalStorageName = "myNotes"; // מי נוט מרבקל רפרנט למשתנה ע״מ לא להתבלבל בהמשך ללוקלסטורי

function addNote() {
  const note = {
    text: form.elements["text"].value,
    time: form.elements["time"].value,
    date: form.elements["date"].value,
  };
  //check if the note is empty
  if (note.text === "" || note.time === "" || note.date === "") {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = "בבקשה מלא את כל הפרטים";
    form.appendChild(error);
    setTimeout(function () {
      error.remove();
    }, 3000);
  } else {
    const arrayOfNotesFromLocal = localStorage.getItem(arrayLocalStorageName);
    const arrayOfNotes = arrayOfNotesFromLocal
      ? JSON.parse(arrayOfNotesFromLocal)
      : [];
    arrayOfNotes.push(note);

    const i = arrayOfNotes.indexOf(note);
    localStorage.setItem(arrayLocalStorageName, JSON.stringify(arrayOfNotes));
    addNoteToDom(note, i);
  }
}

const btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", addNote);

const notesRef = document.querySelector(".list-of-notes");

const btnReset = document.querySelector("#btnReset");
btnReset.addEventListener("click", function () {
  form.reset();
});

function filter(fn) {
  fn(item, index);
}
function deleteNote(event) {
  const btnDelete = event.target;
  const containerRef = btnDelete.parentElement;
  const index = +containerRef.getAttribute("index");
  const arrayOfNotes = JSON.parse(localStorage.getItem(arrayLocalStorageName));
  const arrayFiltered = arrayOfNotes.filter(function (note, i) {
    return index !== i;
  });
  localStorage.setItem(arrayLocalStorageName, JSON.stringify(arrayFiltered));
  containerRef.remove();
}

function addNoteToDom(currentNote, i) {
  const noteContaier = document.createElement("div");
  noteContaier.setAttribute("index", i);
  noteContaier.classList.add("note-container");
  noteContaier.classList.add("fade-in-image");

  const noteText = document.createElement("textarea");
  const divToTextArea = document.createElement("div");

  noteText.setAttribute("id", "textArea");
  noteText.setAttribute("rows", "8");

  divToTextArea.appendChild(noteText); //text
  noteText.innerHTML = currentNote.text;

  const noteDate = document.createElement("div");
  noteDate.setAttribute("id", "noteDate"); //date

  noteDate.innerHTML = currentNote.date;

  const noteTime = document.createElement("div");
  noteTime.setAttribute("id", "noteTime"); //time
  noteTime.innerHTML = currentNote.time;

  const btnDelete = document.createElement("button");

  btnDelete.addEventListener("click", deleteNote);

  btnDelete.classList.add("hidden");
  btnDelete.classList.add("btn-close");
  btnDelete.setAttribute("aria-label", "Close");
  noteContaier.appendChild(divToTextArea);
  noteContaier.appendChild(noteText);
  noteContaier.appendChild(noteDate);
  noteContaier.appendChild(noteTime);
  noteContaier.appendChild(btnDelete);
  notesRef.appendChild(noteContaier);

  btnDelete.parentElement.addEventListener("mouseover", function () {
    btnDelete.classList.remove("hidden");
  });
  btnDelete.parentElement.addEventListener("mouseout", function () {
    btnDelete.classList.add("hidden");
  });
  form.reset();
}

function showNotes() {
  const arrayOfNotes = JSON.parse(localStorage.getItem(arrayLocalStorageName));
  for (let i = 0; i < arrayOfNotes.length; i++) {
    const currentNote = arrayOfNotes[i];
    addNoteToDom(currentNote, i);
  }
}

showNotes();
