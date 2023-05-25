export class Note {
  _name = ''
  _done = false
  _delete = false

  constructor(params) {

    this.name = params.name;
    this.createLayout()
    this.done = params.done;

    //* events

    this.$doneButton.addEventListener('click', () => {
      this.done = !this.done
    })

    this.$deleteBatton.addEventListener('click', () => {
      if (confirm('Удалить дело?')) this.delete = !this.delete
    })
  }

  createLayout() {
    this.$item = document.createElement('div')
    this.$buttonGroup = document.createElement('div')
    this.$nameSpan = document.createElement('span')
    this.$doneButton = document.createElement('button')
    this.$deleteBatton = document.createElement('button')

    this.$item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center', 'border' ,'border-primary', 'p-2', 'mb-2', 'rounded-1')
    this.$buttonGroup.classList.add('btn-group', 'btn-group-sm')
    this.$doneButton.classList.add('btn', 'btn-success')
    this.$deleteBatton.classList.add('btn', 'btn-danger')

    this.$nameSpan.textContent = this.name
    this.$doneButton.textContent = 'Готово'
    this.$deleteBatton.textContent = 'Удалить'

    this.$buttonGroup.append(this.$doneButton, this.$deleteBatton)
    this.$item.append(this.$nameSpan, this.$buttonGroup)
  }

  get done() {
    return this._done
  }
  set done(value) {
    this._done = value
    if (this.$item) {
      if (value) this.$item.classList.add('list-group-item-success')
      else this.$item.classList.remove('list-group-item-success')
    }
  }

  get delete() {
    return this._delete
  }
  set delete(value) {
    this._delete = value
    if (value) {
      this.$item.remove()
    }
  }
}

