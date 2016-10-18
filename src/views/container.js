const html = require('choo/html')
const dragula = require('dragula')
const yaml = require('js-yaml')

const AddButton = require('../components/add-button')
const { getIndexInParent } = require('../util')

const TextField = require('../components/text-field')
const MultipleChoiceField = require('../components/multiple-choice-field')

module.exports = (state, prev, send) => {
  const tree = html`
    <main class="pa4 black-80 measure center">
      <h1>Form designer</h1>
      <section id="canvas">
        ${state.fields.map((field, index) => {
          switch (field.type) {
            case 'radio':
            case 'checkbox':
              return MultipleChoiceField(field, index, changeCallback(index), deleteCallback(index), changeOptionCallback(index))
            default:
              return TextField(field, index, changeCallback(index), deleteCallback(index))
          }
        })}
      </section>
      <section id="controls">
        ${AddButton(addFieldCallback)}
      </section>
      <section id="serialized">
        <h3>Serialized</h3>
        <pre>${yaml.safeDump(state.fields)}</pre>
      </section>
    </main>
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

  function changeCallback (index) {
    return function (updates) {
      const data = { index, updates }
      send('updateField', data)
    }
  }

  function deleteCallback (index) {
    return function () {
      const data = { index }
      send('deleteField', data)
    }
  }

  function changeOptionCallback (index) {
    return function (action, data) {
      const payload = Object.assign({}, data, { fieldIndex: index })
      switch (action) { // switchy swish
        case 'add': return send('addOption', payload)
        case 'update': return send('updateOption', payload)
        case 'reorder': return send('reorderOption', payload)
        case 'delete': return send('deleteOption', payload)
      }
    }
  }

  function addFieldCallback (type) {
    send('addField', type)
  }
}
