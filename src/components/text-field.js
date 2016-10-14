const html = require('choo/html')

const validTypes = [
  'text',
  'time',
  'date',
  'datetime',
  'datetime-local',
  'month',
  'week',
  'email',
  'tel',
  'search',
  'number',
  'url',
  'range',
  'color'
]

module.exports = (field, index, changeCallback, deleteCallback) => {
  const inputType = validTypes.includes(field.type) ? field.type : 'text'
  const input = field.type === 'paragraph'
    ? html`<textarea class="form-control"></textarea>`
    : html`<input type=${inputType} class="pa2 input-reset ba bg-transparent w-100">`

  return html`
    <div class="mt3" key=${index}>
      <div class="drag-handle"></div>
      <label contenteditable="true" oninput=${onInput('label')} class="db fw6 lh-copy f6">${field.label}</label>
      ${input}
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

  function onInput (key) {
    return function (evt) {
      const value = evt.target.innerText
      const updates = { [key]: value }
      changeCallback(updates)
    }
  }

  function onToggleRequired (evt) {
    const updates = { required: !!evt.target.checked }
    changeCallback(updates)
  }

  function onClickDelete (evt) {
    deleteCallback()
  }
}
