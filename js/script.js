//Selecionar

const addNote = document.querySelector("#add-note");
const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
const modal = document.querySelector('#modal'); //Modal para edição das notas
const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
const notes = document.querySelector('#notes');//Lista divs com dados das notas
const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

console.log(addNote)

//Eventos

addNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";
});

btnCloseNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
}) ;

btnSaveNote.addEventListener("click", (evt)=>{
    let data = {
        id:document.querySelector("#input-id").value,
        title:document.querySelector("#input-title").value,
        content:document.querySelector("#input-content").value,
        lastTime:new Date().getTime(),
    }
    console.log(data);
    saveNote(data);
});


// Funções

const saveNote = (note) => {
    note.lastTime = new Date().getTime();
    let notes= loadNotes();
    if (!notes){
      notes=[];
    }[]
    if(note.id.length == 0){
      note.id= new Date().getTime();
      document.querySelector("#input-id").value=note.id;
      notes.push(note);
    }else{
      for (i=0; i<notes.length; i++){
        if(notes[i].id==note.id){
          notes[i]=note;
        }
      }
    }
    notes=JSON.stringify(notes);
    localStorage.setItem('notes', notes);
   
}
  

const listNotes = ()=>{
    let notes2 = loadNotes();
    console.log(notes);
    notes2.forEach((item)=>{
        let card = document.createElement('div');
        card.className = 'card';
        card.style.width = "25rem";
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        let titulo = document.createElement("h2");
        titulo.innerHTML= item.title;
        cardBody.appendChild(titulo);
        card.appendChild(cardBody);
        notes.appendChild(card);
        let texto = document.createElement('p');
        texto.className = 'card-text';
        texto.innerHTML = item.content;
        cardBody.appendChild(texto);
        let time = document.createElement("p");
        time.innerHTML = "ultima Edição: " + new Date(item.lastTime).toLocaleDateString('pt-BR');
        cardBody.appendChild(time);
        console.log(item.id)
    })
}

//card.addEventListener("click", showNote(item));

const loadNotes = ()=>{
    let notes = localStorage.getItem('notes')
    if(!notes){
        notes = [];
    }
    else{
        notes = JSON.parse(notes);
    }
    return notes;
}

listNotes();

function showNote(item){
    modal.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";
}