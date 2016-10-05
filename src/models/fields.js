module.exports = {
  state: {
    fields: [
      {label: 'test'} // show blank question by default
    ]
  },
  reducers: {
    addField: (data, state) => {
      const newFields = [...state.fields, {}]
      return { fields: newFields }
    },
    reorder: (data, state) => {
      const fromIndex = data.fromIndex
      const toIndex = data.toIndex || state.fields.length // if toIndex is null, move to the end
      const newFields = moveItem(state.fields, fromIndex, toIndex)
      return { fields: newFields }
    },
    setField: (data, state) => {
      console.log('setField', data)
      const field = state.fields[data.index]
      const update = { [data.key]: data.value }
      const newFields = [...state.fields]
      newFields[data.index] = Object.assign({}, field, update)
      return { fields: newFields }
    }
  }
}

// Move item in an array immutably
function moveItem (array, fromIndex, toIndex) {
  console.log('moving', fromIndex, toIndex)
  const arrayCopy = array.slice()
  const item = arrayCopy[fromIndex]
  arrayCopy.splice(fromIndex, 1) // remove field that's moving
  arrayCopy.splice(toIndex - 1, 0, item) // add it back
  return arrayCopy
}
