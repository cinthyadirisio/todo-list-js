export function createNote(noteContent) {
    return {
        id: new Date().getTime(),
        noteContent,
        state: false
    }
}
export function createNoteStructure({ id, noteContent, state }) {
    let article = document.createElement('article')
    article.className = 'note'

    let div = document.createElement('div')
    div.className = 'btns'

    let label = document.createElement('label')
    label.setAttribute('for', 'check-done')
    label.setAttribute('data-changestate', id)

    label.textContent = state === false ? 'Pending ' : 'Done '

    let checkbox = document.createElement('input')
    checkbox.setAttribute('data-changestate', id)
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', 'check-done')
    checkbox.setAttribute('id', 'check-done')
    checkbox.checked = state
    label.append(checkbox)

    let buttonX = document.createElement('button')
    buttonX.className = 'btn-x'
    buttonX.setAttribute('data-delete', id)
    buttonX.textContent = 'X'
    div.append(label, buttonX)

    let contentDiv = document.createElement('div')
    contentDiv.className = 'content-note'
    let p = document.createElement('p')
    p.textContent = noteContent
    contentDiv.append(p)

    article.append(div, contentDiv)
    return article
}
export function render(array, container, fn) {
    container.innerHTML = ''
    let fragment = document.createDocumentFragment()
    array.forEach(note => {
        let element = fn(note)
        fragment.appendChild(element)
    });
    container.appendChild(fragment)
}