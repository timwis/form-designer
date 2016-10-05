const html = require('choo/html')

module.exports = (onClickHandler) => {
  return html`
    <button type="button" class="btn btn-default" onclick=${onClick}>
      Add field
    </button>
  `

  function onClick (e) {
    if (onClickHandler) onClickHandler()
  }
}
