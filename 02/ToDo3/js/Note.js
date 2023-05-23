import { NoteList } from "./NoteList.js"

export class Note {
  _name = ''
  _done = false
  _delete = false

  constructor(container, name = '', done = false) {
    this.item = document.createElement('div')
    this.buttonGroup = document.createElement('div')
    this.nameSpan = document.createElement('span')
    this.doneButton = document.createElement('button')
    this.deleteBatton = document.createElement('button')

    this.item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center', 'border' ,'border-primary', 'p-2', 'mb-2', 'rounded-1')
    this.buttonGroup.classList.add('btn-group', 'btn-group-sm')
    this.doneButton.classList.add('btn', 'btn-success')
    this.doneButton.textContent = 'Готово'
    this.deleteBatton.classList.add('btn', 'btn-danger')
    this.deleteBatton.textContent = 'Удалить'

    this.name = name
    this.done = done
    this.container = container

    this.doneButton.addEventListener('click', () => {
      this.done = !this.done
    })
    this.deleteBatton.addEventListener('click', () => {
      if (confirm('Удалить дело?')) this.delete = !this.delete
    })

    this.buttonGroup.append(this.doneButton, this.deleteBatton)
    this.item.append(this.nameSpan, this.buttonGroup)

    if (container instanceof NoteList) container.list.append(this.item)
    else container.append(this.item)

  }

  set name(value) {
    this._name = value
    this.nameSpan.textContent = value
  }

  get name() {
    return this._name
  }

  set done(value) {
    this._done = value
    if (value) this.item.classList.add('list-group-item-success')
    else this.item.classList.remove('list-group-item-success')

    if (this.container instanceof NoteList) this.container.save()
  }

  get done() {
    return this._done
  }

  set delete(value) {
    this._delete = value
    if (value) {
      this.delElement()
    }
  }

  get delete() {
    return this._delete
  }

  delElement() {
    this.item.remove()
    if (this.container instanceof NoteList) {
      this.container.remove(this)
    }
  }
}

