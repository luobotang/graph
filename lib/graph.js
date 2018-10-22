class Graph {
  constructor() {
    // ['v_1', 'v_2', ...]
    this.v_list = []
    // {v_1: {v_2: weight_v_1_to_v_2, ...}, v_2: {...}, ...}
    this.v_map = {}
  }

  addVertice(id) {
    this.v_list.push(id)
    this.v_map[id] = {}
  }

  addConnectRecord(v_1, v_2, weight) {
    this.v_map[v_1][v_2] = weight
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
    const graph = new Graph()
    const {v_list, v_map} = graph

    graph.def = def

    def.split(/\r\n|\n/)
      .map(line => line.trim().replace(/#.*$/, '')) // remove comment
      .filter(Boolean)
      .map(line => line.split(/\s+/))
      .forEach(add_connect_record)

    function add_connect_record([v_1, v_2, weight]) {
      if (!v_map[v_1]) {
        v_list.push(v_1)
        v_map[v_1] = {}
      }

      if (!v_map[v_2]) {
        v_list.push(v_2)
        v_map[v_2] = {}
      }

      v_map[v_1][v_2] = +weight
    }

    return graph
  }
}

module.exports = Graph