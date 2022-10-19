type EdgeRecord = Record<string, Array<string>>;
type Edges = Record<
  string,
  {
    in: Array<string>;
    out: Array<string>;
    inOut: Array<string>;
  }
>;

interface Settings {
  withParents: boolean;
}

interface PathDetail {
  isLast: boolean;
}

export interface INode {
  vertex: string;
  path: Array<string>;
  pathDetails: Array<PathDetail>;
  children: Array<INode>;
  isLeaf: boolean;
  shouldOpen: boolean;
}
class Graph {
  static transformEdges(edges: EdgeRecord) {
    return Object.entries(edges).reduce((edges, [vertex, connections]) => {
      for (const cVertex of connections) {
        if (edges[vertex]) {
          if (edges[vertex].in.includes(cVertex)) {
            edges[vertex].in = edges[vertex].in.filter((v) => v !== cVertex);
            edges[vertex].inOut.push(cVertex);
          } else {
            edges[vertex].out.push(cVertex);
          }
        } else {
          edges[vertex] = {
            in: [],
            out: [cVertex],
            inOut: [],
          };
        }

        if (edges[cVertex]) {
          if (edges[cVertex].out.includes(vertex)) {
            edges[cVertex].out = edges[cVertex].out.filter((v) => v !== vertex);
            edges[cVertex].inOut.push(vertex);
          } else {
            edges[cVertex].in.push(vertex);
          }
        } else {
          edges[cVertex] = {
            in: [vertex],
            out: [],
            inOut: [],
          };
        }
      }

      return edges;
    }, {} as Edges);
  }

  edges: Edges;
  settings: Settings;

  constructor(edges: EdgeRecord, settings?: Partial<Settings>) {
    this.edges = Graph.transformEdges(edges);
    this.settings = {
      withParents: false,
      ...settings,
    };
  }

  setEdges(edges: EdgeRecord) {
    this.edges = Graph.transformEdges(edges);
  }

  setSettings(settings: Partial<Settings>) {
    this.settings = {
      ...this.settings,
      ...settings,
    };
  }

  getChildren(vertex: string, path: Array<string>) {
    let children: Array<string> = [];

    if (this.settings.withParents) {
      children = children.concat(this.edges[vertex].in);
    }

    children = children.concat(
      this.edges[vertex].inOut,
      this.edges[vertex].out
    );

    return children.filter(
      (v) =>
        v !== path[path.length - 1] && !(this.settings.withParents && v === "*")
    );
  }

  getPathDetails(vertex: string, path: Array<string>): Array<PathDetail> {
    return path.map((pVertex, index) => ({
      isLast: this.getChildren(pVertex, path.slice(0, index))
        .slice(-1)
        .includes(index !== path.length - 1 ? path[index + 1] : vertex),
    }));
  }

  getNode(vertex: string, path: Array<string>, shouldOpen: boolean): INode {
    const children = !path.includes(vertex)
      ? this.getChildren(vertex, path).map((cVertex) =>
          this.getNode(cVertex, [...path, vertex], false)
        )
      : [];

    return {
      vertex,
      path,
      pathDetails: this.getPathDetails(vertex, path),
      children,
      isLeaf: path.includes(vertex) || children.length === 0,
      shouldOpen:
        shouldOpen ||
        (!this.settings.withParents &&
          ["*", "p1", "p2", "p3", "a"].includes(vertex)),
    };
  }

  getTree(root: string) {
    if (this.settings.withParents) {
      return this.getNode("a", [], true);
    }
    return this.getNode(root, [], true);
  }
}

export default Graph;
