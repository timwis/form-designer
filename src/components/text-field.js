const html = require('choo/html')
const debounce = require('lodash/debounce')

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
    : html`<input type=${inputType} class="pa2 input-reset ba w-100">`

  return html`
    <div class="mv3" key=${index}>
      <div class="drag-handle"></div>

      <label contenteditable="true" oninput=${onInput('label')} class="b fw6 lh-copy f6">${field.label}</label>

      ${input}

      <div class="mw9">
        <div class="cf">
          <div class="fl w-100 w-50-ns pv2">
            <p class="description mv0 gray f6" contenteditable="true" oninput=${onInput('description')}>${field.description}</p>
          </div>
          <div class="fl w-100 w-50-ns pv1 tr f6">
            <div class="checkbox required-toggle">
              <label class="pa0 ma0 lh-copy pointer">
                <input type="checkbox" ${field.required ? 'checked' : ''} onchange=${onToggleRequired} /> Required
              </label>
            </div>
            <button class="b ph1 pv1 input-reset ba b--black bg-transparent pointer dib" onclick=${onClickDelete}>
              <span class="icon-trash"></span>
            </button>
          </div>
      </div>
    </div>
  `

  function onInput (key) {
    return debounce(function (evt) {
      const value = evt.target.innerText
      const updates = { [key]: value }
      changeCallback(updates)
    }, 300)
  }

  function onToggleRequired (evt) {
    const updates = { required: !!evt.target.checked }
    changeCallback(updates)
  }

  function onClickDelete (evt) {
    deleteCallback()
  }
}
