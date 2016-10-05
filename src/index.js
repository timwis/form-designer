const choo = require('choo')
const css = require('sheetify')

css('bootstrap')
css('dragula/dist/dragula')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  const log = require('choo-log')
  app.use(log())
}

app.model(require('./models/fields'))

const Container = require('./views/container')

app.router((route) => [
  route('/', Container)
])

const tree = app.start()
document.body.appendChild(tree)
