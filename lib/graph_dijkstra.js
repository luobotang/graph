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
    target: undefined,
    done: false
  }

  v_list.forEach((v) => {
    paths[v] = []
    distance[v] = INF
    visited[v] = false
  })

  distance[src] = 0
  paths[src].push(src)
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

    let i = 0
    let hasTarget = false
    callback(search, nextTarget)

    function nextTarget() {
      const target = search.target = v_list[i++]
      if (!target) {
        // no valid target vertice, just go next directly
        hasTarget ? callback(search, next) : next()
        return
      }
      if (visited[target]) return nextTarget()

      const weight = v_map[current][target]
      if (weight === undefined) return nextTarget() // not connected

      hasTarget = true
      if (currentDistance + weight < distance[target]) {
        distance[target] = currentDistance + weight // update shortest path to this vertice
        paths[target] = currentPath.concat(target)
      }
      callback(search, nextTarget)
    }
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
