const html = require('choo/html')
const dragula = require('dragula')

const AddButton = require('../components/add-button')
const { getIndexInParent } = require('../util')

const fieldTypes = {
  text: require('../components/text-field'),
  radio: require('../components/radio-field')
}

module.exports = (state, prev, send) => {
  const tree = html`
    <div class="container">
      <h1>Form designer</h1>
      <section id="canvas">
        ${state.fields.map((field, index) => {
          if (field.type === 'radio') {
            return fieldTypes.radio(field, index, changeCallback(index), changeOptionCallback(index))
          } else {
            return fieldTypes[field.type](field, index, changeCallback(index))
          }
        })}
      </section>
      <section id="controls">
        ${AddButton(addFieldCallback)}
      </section>
    </div>
  `
  const canvas = tree.querySelector('#canvas')
  const dragArea = dragula([canvas], { moves: moveHandler })
  dragArea.on('drop', dragDropCallback)

  return tree

  function moveHandler (el, container, handle) {
    // only allow dragging from the handler
    return handle.classList.contains('drag-handle')
  }

  function dragDropCallback (el, target, source, nextSibling) {
    const data = {
      fromIndex: el.getAttribute('key'),
      toIndex: getIndexInParent(el)
    }
    send('reorderField', data)
  }

  function addFieldCallback (type) {
    send('addField', type)
  }

  function changeCallback (index) {
    return function (updates) {
      const data = { index, updates }
      send('updateField', data)
    }
  }

  function changeOptionCallback (index) {
    return function (action, data) {
      const payload = Object.assign({}, data, { fieldIndex: index })
      switch (action) { // switchy swish
        case 'add': return send('addOption', payload)
        case 'update': return send('updateOption', payload)
        case 'reorder': return send('reorderOption', payload)
      }
    }
  }
}
