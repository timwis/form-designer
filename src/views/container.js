const html = require('choo/html')
const dragula = require('dragula')

const TextField = require('../components/text-field')
const AddButton = require('../components/add-button')

module.exports = (state, prev, send) => {
  const canvas = html`
    <section id="canvas">
      ${state.fields.map((field, index) => TextField(field, index, onUpdate))}
    </section>
  `
  const dragArea = dragula([canvas])
  dragArea.on('drop', onDragDrop)

  return html`
    <div class="container">
      <h1>Form designer</h1>
      ${canvas}
      <section id="controls">
        ${AddButton(onClickAdd)}
      </section>
    </div>
  `

  function onDragDrop (el, target, source, nextSibling) {
    console.log('dropped before', nextSibling, nextSibling && nextSibling.getAttribute('key'))
    const data = {
      fromIndex: el.getAttribute('key'),
      toIndex: nextSibling && nextSibling.getAttribute('key')
    }
    send('reorder', data)
  }

  function onClickAdd () {
    send('addField')
  }

  function onUpdate (index, key, value) {
    const data = { index, key, value }
    send('setField', data)
  }
}
