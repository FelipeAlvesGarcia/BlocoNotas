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
    document.querySelector('#id-note').innerHTML = ' ';
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
    document.querySelector('#id-note').innerHTML = ' ';

})

const topo = document.querySelector("#topo");
topo.addEventListener('click', ()=>{
    window.scroll({
        top:0,
        behavior:"smooth",
    });
});

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
        card.className = 'card mb-3';
        card.id = 'cartao';
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        let cardfooter = document.createElement('div');
        cardBody.style.height  = "100%";
        let titulo = document.createElement("h2");
        titulo.innerHTML= item.title;
        titulo.style.fontFamily = "K2D";
        titulo.style.fontWeight = "bolder";
        titulo.style.color = "#0d6efd";
        titulo.style.marginBottom = "10px";
        cardBody.appendChild(titulo);
        let hr = document.createElement("hr");
        cardBody.appendChild(hr);
        hr.style.marginTop = "-0.1rem";
        hr.style.backgroundColor = "#0d6efd";
        hr.style.opacity = 0.6;
        card.appendChild(cardBody);
        notes.appendChild(card);
        let texto = document.createElement('p');
        texto.className = 'card-text';
        texto.innerHTML = item.content;
        texto.style.fontFamily = "arial";
        texto.style.color = "#012e72";
        texto.style.fontWeight = "bold";
        texto.style.marginLeft = "1rem";
        texto.style.marginBottom = "3.5rem";
        cardBody.appendChild(texto);
        cardBody.appendChild(cardfooter);
        cardfooter.style.position = "absolute";
        cardfooter.style.width = "calc(100% - 2rem)";
        cardfooter.style.bottom = "1rem";
        let hr2 = document.createElement("hr");
        cardfooter.appendChild(hr2);
        hr2.style.marginTop = "-0.1rem";
        hr2.style.backgroundColor = "#0d6efd";
        hr2.style.opacity = 0.6;
        let time = document.createElement("p");
        time.innerHTML = "Ultima Edição: " + new Date(item.lastTime).toLocaleDateString('pt-BR');
        cardfooter.appendChild(time);
        time.style.fontFamily = "K2D";
        time.style.color = "#012e72";
        time.style.fontWeight = "bold";
        time.style.marginLeft = "1rem";
        time.style.opacity = 0.6;
        time.style.marginBottom = 0;
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

    let pLastTime = document.createElement('p');
    pLastTime.innerText = "Ultima Edição: " + new Date(item.lastTime).toLocaleDateString('pt-BR');
    document.querySelector('#content-note').appendChild (pLastTime);
    pLastTime.style.fontFamily = "K2D";
    pLastTime.style.color = "#012e72";
    pLastTime.style.fontWeight = "bold";
    pLastTime.style.marginLeft = "0.5rem";
    pLastTime.style.marginTop = "2px";
    pLastTime.style.marginBottom = "7.5px";
    pLastTime.style.opacity = 0.6;
    pLastTime.style.fontSize = "15px";
    pLastTime.style.width = "63%";
    let hr3 = document.createElement("hr");
    document.querySelector("#content-note").appendChild(hr3);
    hr3.style.marginTop = "-0.1rem";
    hr3.style.backgroundColor = "#0d6efd";
    hr3.style.opacity = 0.6;

    let ptitulo = document.createElement('h2');
    document.querySelector('#content-note').appendChild(ptitulo);
    ptitulo.innerText = ' ';
    ptitulo.innerText = item.title;
    ptitulo.style.fontFamily = "K2D";
    ptitulo.style.fontWeight = "bolder";
    ptitulo.style.color = "#0d6efd";
    ptitulo.style.marginTop = "-7px";
    ptitulo.style.marginLeft = "0.5rem";

    let pContent = document.createElement('p');
    pContent.innerText = ' ';
    pContent.innerText = item.content;
    document.querySelector('#content-note').appendChild (pContent);
    pContent.style.fontFamily = "arial";
    pContent.style.color = "#012e72";
    pContent.style.fontWeight = "bold";
    pContent.style.marginLeft = "1.5rem";

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
