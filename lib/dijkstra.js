const INF = Number.MAX_SAFE_INTEGER

module.exports = function(graph, src) {
  var dist = []
  var visited = []
  var i
  var len = graph.length

  // 所有距离初始化为无限大
  for (i = 0; i < len; i++) {
    dist[i] = INF
    visited[i] = false
  }

  dist[src] = 0 // 源顶点距离设为0

  for (i = 0; i < len; i++) {
    var u = minDistance(dist, visited)
    visited[u] = true

    for (var v = 0; v < len; v++) {
      if (
        !visited[v] && // 未访问过
        graph[u][v] !== 0 && // 与当前点连接
        dist[u] !== INF && // 有距离
        dist[u] + graph[u][v] < dist[v] // 当前点距离有更新的可能性
      ) {
        dist[v] = dist[u] + graph[u][v] // 更新当前点距离
      }
    }
  }

  return dist
}

function minDistance(dist, visited) {
  var min = INF
  var minIndex = -1

  for (var v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v]
      minIndex = v
    }
  }

  return minIndex
}