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
            return fieldTypes.radio(field, index, updateCallback(index), addOptionCallback(index), updateOptionCallback(index), reorderOptionCallback(index))
          } else {
            return fieldTypes[field.type](field, index, updateCallback(index))
          }
        })}
      </section>
      <section id="controls">
        ${AddButton(onClickAdd)}
      </section>
    </div>
  `
  const canvas = tree.querySelector('#canvas')
  const dragArea = dragula([canvas], { moves: moveHandler })
  dragArea.on('drop', onDragDrop)

  return tree

  function onDragDrop (el, target, source, nextSibling) {
    const data = {
      fromIndex: el.getAttribute('key'),
      toIndex: getIndexInParent(el)
    }
    send('reorderField', data)
  }

  function moveHandler (el, container, handle) {
    // only allow dragging from the handler
    return handle.classList.contains('drag-handle')
  }

  function onClickAdd (type) {
    send('addField', type)
  }

  function updateCallback (index) {
    return function (updates) {
      const data = { index, updates }
      send('updateField', data)
    }
  }

  function addOptionCallback (index) {
    return function () {
      send('addOption', index)
    }
  }

  function updateOptionCallback (fieldIndex) {
    return function (optionIndex, updates) {
      const data = { fieldIndex, optionIndex, updates }
      send('updateOption', data)
    }
  }

  function reorderOptionCallback (fieldIndex) {
    return function (fromIndex, toIndex) {
      const data = { fieldIndex, fromIndex, toIndex }
      send('reorderOption', data)
    }
  }
}
