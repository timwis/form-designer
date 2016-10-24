const html = require('choo/html')
const css = require('sheetify')
const dragula = require('dragula')
const debounce = require('lodash/debounce')

const { getIndexInParent } = require('../util')

const prefix = css`
  input[type="radio"].no-left-margin,
  input[type="checkbox"].no-left-margin {
    margin-left: 0;
  }
  .other-option label {
    color: #777;
  }
`

module.exports = (field, fieldIndex, changeCallback, deleteCallback, changeOptionCallback) => {
  const options = field.options || []
  const type = field.type

  const tree = html`
    <div class="mv3 ${prefix}" key=${fieldIndex}>
      <div class="drag-handle"></div>

      <label contenteditable="true" oninput=${onInput('label')} class="b fw6 lh-copy f6">${field.label}</label>

      <div>
        ${options.map((option, optionIndex) => html`
          <div class="${type} mv1 f6" key=${optionIndex}>
            <input type=${type} />
            <label contenteditable="true" oninput=${onInputOption(optionIndex)} class="pa0 ma0 lh-copy pointer">${option.label}</label>
            <button onclick=${onClickDeleteOption(optionIndex)} class="b pv0 ph0 input-reset ba ba--black bg-transparent pointer dib">
              <span class="icon-cancel"></span>
            </button>
          </div>
        `)}
      </div>

      ${field.other ? OtherOption() : ''}

      <div class=${type}>
        <label class="pa0 ma0 lh-copy f6 pointer">
          <input type=${type} />
          <a href="#" onclick=${onClickAddOption} class="link blue underline-hover">Add option</a>
          ${!field.other ? html`<span>or <a href="#" onclick=${toggleOther(true)} class="link blue underline-hover">Add "Other"</a></span>` : ''}
        </label>
      </div>

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
  const optionsGroup = tree.querySelector('.options-group')
  const dragArea = dragula([optionsGroup])
  dragArea.on('drop', onDragDrop)

  return tree

  function OtherOption () {
    return html`
      <div class="${type} other-option f6">
        <input type=${type} class="no-left-margin">
        <label class="pa0 ma0 lh-copy pointer">Other...</label>
        <button class="b pv0 ph0 input-reset ba ba--black bg-transparent pointer dib" onclick=${toggleOther(false)}>
          <span class="icon-cancel"></span>
        </button>
      </div>
    `
  }

  function onInput (key) {
    return debounce(function (evt) {
      const value = evt.target.innerText
      const updates = { [key]: value }
      changeCallback(updates)
    }, 300)
  }

  function onClickDelete (evt) {
    deleteCallback()
  }

  function onInputOption (optionIndex) {
    return debounce(function (evt) {
      const value = evt.target.innerText
      const updates = { label: value }
      const data = { optionIndex, updates }
      changeOptionCallback('update', data)
    }, 300)
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
    evt.stopPropagation()
  }

  function toggleOther (setTo) {
    return function (evt) {
      const updates = { other: setTo }
      changeCallback(updates)
      evt.preventDefault()
      evt.stopPropagation()
    }
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
