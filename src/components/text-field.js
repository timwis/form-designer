const html = require('choo/html')
const css = require('sheetify')

module.exports = (field, index, onUpdate) => {
  const prefix = css`
    [contenteditable="true"] {
      cursor: text;
    }
    [contenteditable="true"]:empty::before {
      border: 1px #777 dashed;
      padding: 3px;
    }
    label[contenteditable="true"]:empty::before {
      content: 'Untitled Question'
    }
    .help-block[contenteditable="true"]:empty::before {
      content: 'Optional description'
    }
  `
  return html`
    <div class="form-group ${prefix}" key=${index}>
      <label contenteditable="true" oninput=${onInput('label')}>${field.label}</label>
      <input type="text" class="form-control">
      <p class="help-block" contenteditable="true" oninput=${onInput('description')}>${field.description}</p>
    </div>
  `

  function onInput (key) {
    return function (evt) {
      const value = evt.target.innerText
      onUpdate(index, key, value)
    }
  }
}
