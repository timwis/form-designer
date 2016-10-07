const html = require('choo/html')
const bsn = require('bootstrap.native')

module.exports = (cb) => {
  const tree = html`
    <div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Add field <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#" onclick=${onClick('text')}>Text</a></li>
        <li><a href="#" onclick=${onClick('radio')}>Radio</a></li>
      </ul>
    </div>
  `

  new bsn.Dropdown(tree.querySelector('[data-toggle="dropdown"]')) // eslint-disable-line
  return tree

  function onClick (type) {
    return function (evt) {
      cb(type)
      evt.preventDefault()
      evt.stopPropagation()
    }
  }
}
