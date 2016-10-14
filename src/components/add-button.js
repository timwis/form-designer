const html = require('choo/html')
const bsn = require('bootstrap.native')

module.exports = (addFieldCallback) => {
  const tree = html`
    <div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="icon-plus"></span>
        Add field
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#" onclick=${onClick({ type: 'text' })}>Text (Short answer)</a></li>
        <li><a href="#" onclick=${onClick({ type: 'email' })}>Email</a></li>
        <li><a href="#" onclick=${onClick({ type: 'number' })}>Number</a></li>
        <li><a href="#" onclick=${onClick({ type: 'paragraph' })}>Paragraph</a></li>
        <li><a href="#" onclick=${onClick({ type: 'radio', options: [ {} ] })}>Radio</a></li>
        <li><a href="#" onclick=${onClick({ type: 'checkbox', options: [ {} ] })}>Checkboxes</a></li>
      </ul>
    </div>
  `

  new bsn.Dropdown(tree.querySelector('[data-toggle="dropdown"]')) // eslint-disable-line
  return tree

  function onClick (field) {
    return function (evt) {
      addFieldCallback(field)
      evt.preventDefault()
      evt.stopPropagation()
    }
  }
}
