const assert = require('assert')
const bfs = require('../lib/bfs')
const dfs = require('../lib/dfs')
const dijkstra = require('../lib/dijkstra')
const {getPaths} = require('../lib/util')

describe('search methods', () => {
  it('bfs', () => {
    const {vertices, adjList} = prepairGraph()
    let result = ''
    const {distances, predecessors} = bfs(vertices, adjList, (v) => {
      result += v
    })
    assert.equal(result, 'ABDCE')
    
    const paths = getPaths(vertices, distances, predecessors)
    console.log(paths)
  })

  it('dfs', () => {
    const {vertices, adjList} = prepairGraph()
    let result = ''
    dfs(vertices, adjList, (v) => {
      result += v
    })
    assert.equal(result, 'ABCDE')
  })

  it('dijkstra', () => {
    const graph = defineMatrix(`
      0 2 4 0 0 0
      0 0 1 4 2 0
      0 0 0 0 3 0
      0 0 0 0 0 2
      0 0 0 3 0 2
      0 0 0 0 0 0
    `)

    const result = dijkstra(graph, 0)

    console.log(result)
  })
})

function prepairGraph() {
  return defineGraph(`
    A: B D
    B: C
    C:
    D: E
    E:
  `)
}

function defineGraph(str) {
  var lines = str.split(/\r\n|\n/)
  var vertices = []
  var adjList = {}
  lines.forEach((line) => {
    if (!line || /^\s*#/.test(line) || line.indexOf(':') === -1) return
    const [v, v_others] = line.trim().split(/\s*:\s*/)
    vertices.push(v)
    adjList[v] = v_others.split(/\s+/)
  })
  return {vertices, adjList}
}

function defineMatrix(str) {
  return str.split(/\r\n|\n/).map((line) => line.trim()).filter(Boolean).map((line) =>
    line.split(/\s+/).map((ch) => +ch)
  )
}