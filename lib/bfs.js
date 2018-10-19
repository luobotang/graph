const { initColor } = require('./util')

module.exports = function (vertices, adjTable, callback) {
  var color = initColor(vertices)
  queue = []
  d = {}
  pred = {}

  queue.push(vertices[0])
  color[vertices[0]] = 1

  vertices.forEach((v) => {
    d[v] = 0
    pred[v] = null
  })

  while (queue.length) {
    var v = queue.shift()
    var v_adj_list = adjTable[v]

    v_adj_list.forEach((v_adj) => {
      if (color[v_adj] === 0) {
        color[v_adj] = 1
        d[v_adj] = d[v] + 1
        pred[v_adj] = v
        queue.push(v_adj)
      }
    })

    color[v] = 2
    if (callback) callback(v)
  }

  return {distances: d, predecessors: pred}
}
