module.exports = {
  state: {
    fields: [
      { type: 'text' }, // show blank question by default
      { type: 'radio' }
    ]
  },
  reducers: {
    addField: (type, state) => {
      const newField = { type }
      const newFieldList = [ ...state.fields, newField ]
      return { fields: newFieldList }
    },
    updateField: (data, state) => {
      const { index, updates } = data
      const newFieldList = updateItem(state.fields, index, updates)
      return { fields: newFieldList }
    },
    reorderField: (data, state) => {
      const newFieldList = moveItem(state.fields, data.fromIndex, data.toIndex)
      return { fields: newFieldList }
    },
    addOption: (fieldIndex, state) => {
      const oldOptions = state.fields[fieldIndex].options
      const newOptions = oldOptions ? oldOptions.slice() : []
      newOptions.push({})
      const updates = { options: newOptions }
      const newFieldList = updateItem(state.fields, fieldIndex, updates)
      return { fields: newFieldList }
    },
    updateOption: (data, state) => {
      const { fieldIndex, optionIndex, updates } = data
      const oldOptions = state.fields[fieldIndex].options || []
      const newOptions = updateItem(oldOptions, optionIndex, updates)
      const fieldUpdates = { options: newOptions }
      const newFieldList = updateItem(state.fields, fieldIndex, fieldUpdates)
      return { fields: newFieldList }
    },
    reorderOption: (data, state) => {
      const { fieldIndex, fromIndex, toIndex } = data
      const oldOptions = state.fields[fieldIndex].options || []
      const newOptions = moveItem(oldOptions, fromIndex, toIndex)
      const updates = { options: newOptions }
      const newFieldList = updateItem(state.fields, fieldIndex, updates)
      return { fields: newFieldList }
    }
  }
}

// Update object in array immutably
function updateItem (array, index, updates) {
  const newList = array.slice()
  const oldItem = newList[index]
  const newItem = Object.assign({}, oldItem, updates)
  newList[index] = newItem
  return newList
}

// Move item in an array immutably
function moveItem (array, fromIndex, toIndex) {
  const arrayCopy = array.slice()
  const item = arrayCopy[fromIndex]
  arrayCopy.splice(fromIndex, 1) // remove field that's moving
  arrayCopy.splice(toIndex, 0, item) // add it back
  return arrayCopy
}
