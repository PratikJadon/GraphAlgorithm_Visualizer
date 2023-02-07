function checknodes(graph) {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    for (var j = 0; j < node.connected.length; j++) {
      graph.adj[i + 1][node.connected[j].number] = 1;
    }
  }
}

class Graph {
  constructor(maxnodes) {
    maxnodes = maxnodes + 1;
    this.visited = new Array(maxnodes);

    this.adj = new Array(maxnodes);

    for (var i = 0; i < maxnodes; i++) {
      this.adj[i] = new Array(maxnodes);
      this.visited = 0;
    }

    for (var i = 0; i < this.adj.length; i++) {
      for (var j = 0; j < this.adj[i].length; j++) {
        this.adj[i][j] = 0;
      }
    }

    checknodes(this);
  }
}
