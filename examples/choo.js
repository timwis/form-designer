const choo = require('choo')
const html = require('choo/html')
const yaml = require('js-yaml')

const FormDesigner = require('./views/container')

const app = choo()

app.model({
  state: {
    fields: [ { type: 'text' } ] // show blank question by default
  },
  reducers: {
    updateState: (data, state) => data
  }
})

app.router((route) => [
  route('/', View)
])

const tree = app.start()
document.body.appendChild(tree)

function View (state, prev, send) {
  return html`
    <main style="margin: 0 30%">
      <h1>Form designer</h1>

      ${FormDesigner(state, onStateChange)}

      <section id="serialized">
        <h3>Serialized</h3>
        <pre>${yaml.safeDump(state.fields)}</pre>
      </section>
    </main>
  `
  function onStateChange (update) {
    send('updateState', update)
  }
}
