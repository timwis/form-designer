module.exports = {
  state: {
    fields: [
      { type: 'checkbox', options: [{}] } // show blank question by default
    ]
  },
  reducers: {
    addField: (newField, state) => {
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
    deleteField: (data, state) => {
      const newFieldList = removeItem(state.fields, data.index)
      return { fields: newFieldList }
    },
    addOption: (data, state) => {
      const { fieldIndex } = data
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
    },
    deleteOption: (data, state) => {
      const { fieldIndex, optionIndex } = data
      const oldOptions = state.fields[fieldIndex].options || []
      const newOptions = removeItem(oldOptions, optionIndex)
      const fieldUpdates = { options: newOptions }
      const newFieldList = updateItem(state.fields, fieldIndex, fieldUpdates)
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

function removeItem (array, index) {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
}
