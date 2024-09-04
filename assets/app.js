const inputNote = document.querySelector('#note-box')
const submitBtn = document.querySelector('#submitBtn')
const resetBtn = document.querySelector('#resetBtn')
const notesBox = document.querySelector('#notes-box')
const searchBar = document.querySelector('#searchBar')

const prueba = [
    // "Imitar a un pingüino por 5 minutos",
    // "Hablar como un pirata durante una hora",
    // "Bailar la Macarena en la sala de estar",
    // "Hacer una llamada telefónica usando solo rimas",
    // "Caminar hacia atrás por toda la casa",
    // "Cantar una canción popular con la boca cerrada",
    // "Hacer una obra de teatro con calcetines como marionetas",
    // "Escribir un poema sobre tu comida favorita",
    // "Hacer una coreografía de baile para una canción infantil",
    // "Hablar en un acento británico durante 30 minutos"
];


submitBtn.addEventListener('click', () => {
    let newNote = captureInput(inputNote)
    prueba.push(newNote)
    localStorage.setItem('notes', JSON.stringify(prueba))
    console.log(prueba)
    drawNotes(prueba, notesBox)
})

function captureInput(input) {
    let value = input.value
    input.value = ''
    return value
}

function captureSearch(input){
    console.log(input)
    let searchValue = input.value
    return searchValue
}

searchBar.addEventListener('keyup', () =>{
    let newSearch = captureSearch(searchBar)
})

function filterByText(text){
    let filteredNotes = fetchStoraged()
    filteredNotes.filter( element => element.includes(text))
    console.log(filteredNotes)
    if (!filteredNotes.lenght === 0) {
        drawNotes(filteredNotes, notesBox)
    }else{
        drawNotes(fetchStoraged(), notesBox)
    }
}

resetBtn.addEventListener('click', () => {
    resetInput(inputNote)
})

function resetInput(input) {
    input.value = ''
}

function deleteNote(id) {
    prueba.splice(id, 1)
    localStorage.setItem('notes', JSON.stringify(prueba))
    drawNotes(prueba, notesBox)
}

function fetchStoraged(){
    const notesStoraged = JSON.parse(localStorage.getItem('notes'))
    console.log(notesStoraged)
    return notesStoraged
}

function drawNotes(array, container) {
    console.log(array, container)
    container.innerHTML = ''
    let fragment = document.createDocumentFragment()
    if(array.lenght == 0){
        container.innerHTML = '<p>No hay notas para mostrar</p>'
    } else {
        array.forEach((item, index) => {
            let note = document.createElement('article')
            note.classList = 'note'
            note.innerHTML = `<div class="btns">
            <label for="check-done">Hecho
            
            <input type="checkbox" name="check-done" id="check-done">
            </label>
            
            <button id='${index}' class="btn-x">x</button>
            </div>
            
            <div class="content-note">
                        <p>${item}</p>
                    </div>`
            fragment.appendChild(note)
        })
    }
    container.appendChild(fragment)
    addDeleteEventListeners()
} drawNotes(fetchStoraged(), notesBox)




function addDeleteEventListeners() {
    const allDeleteNoteBtns = document.querySelectorAll('.btn-x')
    allDeleteNoteBtns.forEach(item => {
        item.addEventListener('click', () => {
            deleteNote(item.id)
        })
    })
}
