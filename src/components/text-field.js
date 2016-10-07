const html = require('choo/html')

module.exports = (field, index, updateCallback) => {
  return html`
    <div class="form-group" key=${index}>
      <div class="drag-handle"></div>
      <label contenteditable="true" oninput=${onInput('label')}>${field.label}</label>
      <input type="text" class="form-control">
      <p class="help-block" contenteditable="true" oninput=${onInput('description')}>${field.description}</p>
    </div>
  `

  function onInput (key) {
    return function (evt) {
      const value = evt.target.innerText
      const updates = { [key]: value }
      updateCallback(updates)
    }
  }
}
