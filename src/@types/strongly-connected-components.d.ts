declare module "strongly-connected-components" {
  const scc: (edges: Array<Array<string>>) => {
    adjacencyList: Array<Array<string>>;
    components: Array<Array<string>>;
  };

  export default scc;
}
