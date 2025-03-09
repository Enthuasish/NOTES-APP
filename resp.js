const notesContainer = document.getElementById('notesContainer');
const addNoteBtn = document.getElementById('addNoteBtn');

//loads notes from localStorage

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function updateLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement('div');
    element.classList.add('note');
    element.innerHTML = `<div class="note-header">
    <button class="note-btn edit-btn">✒️</button>
    <button class="note-btn delete-btn">✂️</button>
    </div>
    <textarea class="note-content" placeholder="Start typing your note....">${content}</textarea>
    `;

    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    const textArea = element.querySelector('textarea');

    deleteBtn.addEventListener('click',()=>{
        element.remove();
        notes = notes.filter(note => note.id !== id);
        updateLocalStorage();
    });

    let isEditing = false;
    editBtn.addEventListener('click', ()=>{

        isEditing = !isEditing;
        textArea.readOnly = !isEditing;
        textArea.focus();
        editBtn.textContent = isEditing ? '💾' : '✒️';
    });

    textArea.addEventListener('input', (e) => {
        const index = notes.findIndex(note => note.id ===id);
        notes[index].content = e.target.value;
        updateLocalStorage();
    });

    return element;
}

function addNewNote(){
    const noteObj = {
        id: Date.now(), content:''
    };
    notes.push(noteObj);

    notesContainer.appendChild(createNoteElement(noteObj.id, noteObj.content));
    updateLocalStorage();
}

//Initialize notes

notes.forEach(note =>{

    notesContainer.appendChild(createNoteElement(note.id, note.content));
});


addNoteBtn.addEventListener('click', addNewNote);
