const html = require('choo/html')
const css = require('sheetify')
const bsn = require('bootstrap.native')

const prefix = css`
  :host {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
  }
  :host.open .dropdown-menu {
    display: block;
  }
`

module.exports = (addFieldCallback) => {
  const tree = html`
    <div class=${prefix}>
      <button type="button" class="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
