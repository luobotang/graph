const { initColor } = require('./util')

module.exports = function (vertices, adjTable, callback) {
  const color = initColor(vertices)
  visit(vertices[0])

  function visit(v) {
    if (color[v] !== 0) return

    color[v] = 1
    if (callback) callback(v)

    adjTable[v].forEach((v_adj) => visit(v_adj))

    color[v] = 2
  }
}