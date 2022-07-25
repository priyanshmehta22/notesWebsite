console.log("this is a notes app");
showNotes();
// if user adds a note, update it ot local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesobj.push(myobj);

  localStorage.setItem("notes", JSON.stringify(notesobj));

  addTxt.value = "";
  addTitle.value = "";

  console.log(notesobj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
        <div class ="notecard my-2 mx-2" style="width: 18rem; border: 2px black solid; ">
            <div class="card-body">
            
            
                <h5 class="card-title">${index + 1}. ${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index} " onclick="delNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesobj.length != 0) {
    notesElm.innerHTML = html;
  }
  if (notesobj.length == 0) {
    notesElm.innerHTML = `ADD A NOTE`;
  }
}

function delNote(index) {
  console.log("i am deleting note of index", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }

  notesobj.splice(`${index}`, 1);

  localStorage.setItem("notes", JSON.stringify(notesobj));

  showNotes();
}

let searchstr = document.getElementById("search");
searchstr.addEventListener("input", function (e) {
  let inputVal = search.value;
  console.log("input event fired", inputVal);
  let notecards = document.getElementsByClassName("notecard");
  Array.from(notecards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let titleTxt = element.getElementsByTagName("h5")[0].innerText;
    if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
