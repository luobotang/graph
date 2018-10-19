exports.initColor = function (vertices) {
  var color = {}
  for (var i = 0, len = vertices.length; i < len; i++) {
    color[vertices[i]] = 0 // 'white'
  }
  return color
}

exports.getPaths = function (vertices, distances, predecessors) {
  var v_from = vertices[0]
  var paths = []
  vertices.forEach((v_to) => {
    if (v_to === v_from) return

    var path = []
    var v = v_to
    while (v !== v_from) {
      path.push(v)
      v = predecessors[v]
    }
    path.push(v_from)
    paths.push(path)
  })
  return paths
}