type EdgeMap = Map<string, Array<string>>;

export class Graph {
  edges: EdgeMap;

  constructor(edges: EdgeMap) {
    this.edges = edges;
  }

  getVertexConnections(vertex: string) {
    return this.edges.get(vertex) ?? [];
  }

  getVertexChildren(vertex: string, parent: string) {
    return this.getVertexConnections(vertex).filter((v) => v !== parent);
  }
}
