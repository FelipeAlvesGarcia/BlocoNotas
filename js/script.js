//Selecionar

const addNote = document.querySelector("#add-note");
const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
const modal = document.querySelector('#modal'); //Modal para edição das notas
const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
const notes = document.querySelector('#notes');//Lista divs com dados das notas
const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

console.log(addNote)

const edit = document.querySelector("#edit");
const delet = document.querySelector("#delet");

//Eventos

addNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";
    let idd = document.querySelector("#input-id").value = ' ';
    let titulo = document.querySelector("#input-title").value = ' ';
    let texto = document.querySelector("#input-content").value = ' ';

});

btnCloseNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
    listNotes();
    document.querySelector('#title-note').innerHTML = '';
    document.querySelector('#content-note').innerHTML = ' ';
}) ;

btnSaveNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    let data = {
        id:document.querySelector("#input-id").value,
        title:document.querySelector("#input-title").value,
        content:document.querySelector("#input-content").value,
        lastTime:new Date().getTime(),
    }
    console.log(data);
    saveNote(data);
});

closeModal.addEventListener('click', (evt)=>{
    modalView.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
    evt.preventDefault();
    document.querySelector('#title-note').innerHTML = '';
    document.querySelector('#content-note').innerHTML = ' ';

})

// Funções

const saveNote = (note) => {
    note.lastTime = new Date().getTime();
    let notes= loadNotes();
    if (!notes){
      notes=[];
    }
    console.log(note.id)
    if(note.id.trim().length == 0){
        note.id= new Date().getTime();
        document.querySelector("#input-id").value=note.id;
        notes.push(note);
    }else{
        notes.forEach((item, i) =>{
        if(item.id==note.id){
            notes[i] = note;
        }
      })
    }
    console.log(notes)
    notes=JSON.stringify(notes);
    localStorage.setItem('notes', notes);
   
}
  

const listNotes = ()=>{
    let notes2 = loadNotes();
    notes.innerHTML = ' ';
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
        console.log(item.id);
        card.addEventListener("click",(evt)=>{
            evt.preventDefault();
            showNote(item);
        });

    })
}

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

function showNote(item){
    modalView.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";
    let ptitulo = document.createElement('p');
    document.querySelector('#title-note').appendChild(ptitulo);
    ptitulo.innerText = ' ';
    ptitulo.innerText = item.title;
    let pContent = document.createElement('p');
    pContent.innerText = ' ';
    pContent.innerText = item.content;
    document.querySelector('#content-note').appendChild (pContent);
    let pLastTime = document.createElement('p');
    pLastTime.innerText = new Date(item.lastTime).toLocaleDateString('pt-BR');
    document.querySelector('#content-note').appendChild (pLastTime);

    edit.addEventListener('click', ()=>{
        modalView.style.display = "none";
        modal.style.display = "block";
        document.querySelector('#input-title').value = item.title;
        document.querySelector('#input-content').value = item.content;
        document.querySelector('#input-id').value = item.id;

    })
    
    delet.addEventListener('click', (evt)=>{
        document.querySelector('#title-note').innerHTML = '';
        document.querySelector('#content-note').innerHTML = ' ';
        modalView.style.display = "none";
        notes.style.display = "flex";
        addNote.style.display = "block";
        evt.preventDefault();
        let notas = localStorage.getItem('notes');
        notas = JSON.parse(notas);
        for(let j=0; j<notas.length;j++){
            if(notas[j].id==item.id){
                //notas.splice(j, 1);
                for(let n=j;n<notas.length-1;n++){
                    notas[n] = notas[n+1];
                }
                let deletar = notas.length-1;
                notas.splice(deletar, 1);
            }
        };
        console.log(notas);
        localStorage.setItem('notes', JSON.stringify(notas));
        listNotes();
    });
}

listNotes();