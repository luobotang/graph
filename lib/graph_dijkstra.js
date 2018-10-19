module.exports = function (graph, src, callback) {
  const {v_list, v_map} = graph
  const distance = {}
  const visited = {}
  const paths = {}
  const INF = Number.MAX_SAFE_INTEGER
  const search = {
    distance,
    visited,
    paths,
    current: undefined,
    done: false
  }

  v_list.forEach((v) => {
    paths[v] = ''
    distance[v] = INF
    visited[v] = false
  })

  distance[src] = 0
  paths[src] = src
  callback(search, next)

  function next() {
    const current = search.current = findUnvisitedMinDistanceVertice()
    if (!current) {
      search.done = true
      callback(search, next)
      return
    }

    visited[current] = true

    const currentPath = paths[current]
    const currentDistance = distance[current]
    if (currentDistance === INF) throw new Error(`current vertice "${current}" is not connected`)

    v_list.forEach((v) => {
      if (visited[v]) return

      const weight = v_map[current][v]
      if (weight === undefined) return // not connected

      if (currentDistance + weight < distance[v]) {
        distance[v] = currentDistance + weight // update shortest path to this vertice
        paths[v] = currentPath + v
      }
    })

    callback(search, next)
  }

  function findUnvisitedMinDistanceVertice() {
    let minDistance = INF
    let vertice = undefined

    v_list.forEach((v) => {
      if (visited[v]) return
      if (distance[v] > minDistance) return
      minDistance = distance[v]
      vertice = v
    })

    return vertice
  }
}
