const path = require('path')
const {rollup} = require('rollup')
const commonjs = require('rollup-plugin-commonjs')

const dir_app = path.join(__dirname, '../app')
const input = {
  input: path.join(dir_app, 'graph_dijkstra.js'),
  plugins: [
    commonjs({includes: '**/*.js'})
  ]
}
const output = {
  file: path.join(dir_app, 'graph_dijkstra.bundle.js'),
  format: 'iife',
  name: 'app'
}

rollup(input).then((bundle) => (
  bundle.generate(output).then(() => bundle.write(output))
)).catch(e => console.error(e))
