var app = (function () {
  'use strict';

  class Graph {
    constructor() {
      // ['v_1', 'v_2', ...]
      this.v_list = [];
      // {v_1: {v_2: weight_v_1_to_v_2, ...}, v_2: {...}, ...}
      this.v_map = {};
    }

    addVertice(id) {
      this.v_list.push(id);
      this.v_map[id] = {};
    }

    addConnectRecord(v_1, v_2, weight) {
      this.v_map[v_1][v_2] = weight;
    }

    /**
     * v_1 v_2 weight 
     * `
     * # comment
     * a b 4
     * a c 1
     * c d 5
     * `
     */
    static create(def) {
      const graph = new Graph();
      const {v_list, v_map} = graph;

      graph.def = def;

      def.split(/\r\n|\n/)
        .map(line => line.trim().replace(/#.*$/, '')) // remove comment
        .filter(Boolean)
        .map(line => line.split(/\s+/))
        .forEach(add_connect_record);

      function add_connect_record([v_1, v_2, weight]) {
        if (!v_map[v_1]) {
          v_list.push(v_1);
          v_map[v_1] = {};
        }

        if (!v_map[v_2]) {
          v_list.push(v_2);
          v_map[v_2] = {};
        }

        v_map[v_1][v_2] = +weight;
      }

      return graph
    }
  }

  var graph = Graph;

  var graph_dijkstra = function (graph, src, callback) {
    const {v_list, v_map} = graph;
    const distance = {};
    const visited = {};
    const paths = {};
    const INF = Number.MAX_SAFE_INTEGER;
    const search = {
      distance,
      visited,
      paths,
      current: undefined,
      target: undefined,
      done: false
    };

    v_list.forEach((v) => {
      paths[v] = [];
      distance[v] = INF;
      visited[v] = false;
    });

    distance[src] = 0;
    paths[src].push(src);
    callback(search, next);

    function next() {
      const current = search.current = findUnvisitedMinDistanceVertice();
      if (!current) {
        search.done = true;
        callback(search, next);
        return
      }

      visited[current] = true;

      const currentPath = paths[current];
      const currentDistance = distance[current];
      if (currentDistance === INF) throw new Error(`current vertice "${current}" is not connected`)

      let i = 0;
      let hasTarget = false;
      callback(search, nextTarget);

      function nextTarget() {
        const target = search.target = v_list[i++];
        if (!target) {
          // no valid target vertice, just go next directly
          hasTarget ? callback(search, next) : next();
          return
        }
        if (visited[target]) return nextTarget()

        const weight = v_map[current][target];
        if (weight === undefined) return nextTarget() // not connected

        hasTarget = true;
        if (currentDistance + weight < distance[target]) {
          distance[target] = currentDistance + weight; // update shortest path to this vertice
          paths[target] = currentPath.concat(target);
        }
        callback(search, nextTarget);
      }
    }

    function findUnvisitedMinDistanceVertice() {
      let minDistance = INF;
      let vertice = undefined;

      v_list.forEach((v) => {
        if (visited[v]) return
        if (distance[v] > minDistance) return
        minDistance = distance[v];
        vertice = v;
      });

      return vertice
    }
  };

  var graph_dijkstra$1 = {
    Graph: graph,
    dijkstra: graph_dijkstra
  };

  return graph_dijkstra$1;

}());
