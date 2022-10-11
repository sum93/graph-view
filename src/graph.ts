type EdgeMap = Map<string, Array<string>>;

export enum ChildrenStrategy {
  ALL_CONNECTIONS,
  HIDE_PARENT,
}
export class Graph {
  edges: EdgeMap;
  childrenStrategy: ChildrenStrategy;

  constructor(edges: EdgeMap) {
    this.edges = edges;
    this.childrenStrategy = ChildrenStrategy.ALL_CONNECTIONS;
  }

  setChildrenStrategy(strategy: ChildrenStrategy) {
    this.childrenStrategy = strategy;
  }

  getConnections(vertex: string) {
    return this.edges.get(vertex) ?? [];
  }

  getChildren(vertex: string, path: Array<string>) {
    return this.getConnections(vertex).filter(
      (v) => v !== path[path.length - 1]
    );
  }

  // Best strategy pattern ever
  getNodeChildren(vertex: string, path: Array<string>) {
    switch (this.childrenStrategy) {
      case ChildrenStrategy.ALL_CONNECTIONS:
        return this.getConnections(vertex);
      case ChildrenStrategy.HIDE_PARENT:
        return this.getChildren(vertex, path);
    }
  }

  getIsLastPath(vertex: string, path: Array<string>) {
    return path.map((pVertex, index) =>
      this.getNodeChildren(pVertex, path.slice(0, index))
        .slice(-1)
        .includes(index !== path.length - 1 ? path[index + 1] : vertex)
    );
  }
}
