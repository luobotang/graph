const Graph = require('../lib/graph')
const dijkstra = require('../lib/graph_dijkstra')

describe('dijkstra', () => {

  it('search shortest path', (finished) => {
    const graph = Graph.create(`
      a b 2
      a c 4
      b c 2
      b d 4
      b c 2
      b e 2
      c e 3
      d f 2
      e d 3
      e f 2
    `)

    const vertices = graph.v_list
    const str_vertices = vertices.join(' ')

    dijkstra(graph, 'a', ({distance, visited, paths, current, done}, next) => {
      if (done) {
        console.log(graph.v_list.map(v => `${v} - ${distance[v]} : ${paths[v].join('->')}`).join('\n'))
        finished()
        return
      }

      console.log(`
current: ${current || 'N/A'}
          ${str_vertices}
distance  ${renderDistance(distance)}
visited   ${renderVisited(visited)}
      `)

      setTimeout(next, 1000)
    })

    function renderDistance(distance) {
      return vertices.map(v => distance[v]).map(d => d > 10 ? ' ' : d).join(' ')
    }

    function renderVisited(visited) {
      return vertices.map(v => visited[v]).map(b => b ? 'T' : ' ').join(' ')
    }
  }).timeout(60 * 1000)
})