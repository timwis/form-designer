const html = require('choo/html')
const css = require('sheetify')
const dragula = require('dragula')

const { getIndexInParent } = require('../util')

const prefix = css`
  input[type="radio"].no-left-margin {
    margin-left: 0;
  }
`

module.exports = (field, fieldIndex, changeCallback, deleteCallback, changeOptionCallback) => {
  const options = field.options || []

  const tree = html`
    <div class="form-group ${prefix}" key=${fieldIndex}>
      <div class="drag-handle"></div>
      <label contenteditable="true" oninput=${onInput('label')}>${field.label}</label>

      <div class="options-group">
        ${options.map((option, optionIndex) => html`
          <div class="radio" key=${optionIndex}>
            <input type="radio" class="no-left-margin">
            <label contenteditable="true" oninput=${onInputOption(optionIndex)}>${option.label}</label>
            <button class="btn btn-default btn-xs" onclick=${onClickDeleteOption(optionIndex)}>
              <span class="icon-trash"></span>
            </button>
          </div>
        `)}
      </div>

      <div class="radio">
        <label onclick=${onClickAddOption}>
          <input type="radio">
          Add option
        </label>
      </div>

      <div class="row">
        <div class="col-sm-8">
          <p class="help-block" contenteditable="true" oninput=${onInput('description')}>${field.description}</p>
        </div>
        <div class="col-sm-4">
          <div class="field-controls">
            <div class="checkbox required-toggle">
              <label><input type="checkbox" ${field.required ? 'checked' : ''} onchange=${onToggleRequired} /> Required</label>
            </div>
            <button class="btn btn-default btn-xs" onclick=${onClickDelete}>
              <span class="icon-trash"></span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `
  const optionsGroup = tree.querySelector('.options-group')
  const dragArea = dragula([optionsGroup])
  dragArea.on('drop', onDragDrop)

  return tree

  function onInput (key) {
    return function (evt) {
      const value = evt.target.innerText
      const updates = { [key]: value }
      changeCallback(updates)
    }
  }

  function onClickDelete (evt) {
    deleteCallback()
  }

  function onInputOption (optionIndex) {
    return function (evt) {
      const value = evt.target.innerText
      const updates = { label: value }
      const data = { optionIndex, updates }
      changeOptionCallback('update', data)
    }
  }

  function onClickDeleteOption (optionIndex) {
    return function (evt) {
      const data = { optionIndex }
      changeOptionCallback('delete', data)
    }
  }

  function onClickAddOption (evt) {
    changeOptionCallback('add')
    evt.preventDefault()
  }

  function onDragDrop (el, target, source, nextSibling) {
    const fromIndex = el.getAttribute('key')
    const toIndex = getIndexInParent(el)
    const data = { fromIndex, toIndex }
    changeOptionCallback('reorder', data)
  }

  function onToggleRequired (evt) {
    const updates = { required: !!evt.target.checked }
    changeCallback(updates)
  }
}
