// import scc from "strongly-connected-components";

import undirectedImg from "./assets/undirected.svg";
import directedImg from "./assets/directed.svg";
import parentsImg from "./assets/parents.svg";

// Undirected
const undirected = Object.fromEntries([
  ["a", ["b", "c", "d"]],
  ["b", ["a", "c", "d"]],
  ["c", ["a", "b", "d"]],
  ["d", ["a", "b", "c"]],
]);

// Multiple Paths
const directed = Object.fromEntries([
  ["a", ["b", "c"]],
  ["b", ["c", "d"]],
  ["c", ["a", "d"]],
  ["d", ["a", "b"]],
]);

// Parents
const parents = Object.fromEntries([
  ["*", ["p1", "p2", "p3"]],
  ["p1", ["p2"]],
  ["p2", ["p3", "a"]],
  ["p3", ["a"]],
  ["a", ["b", "c"]],
  ["b", ["c", "d"]],
  ["c", ["a", "d"]],
  ["d", ["a", "b"]],
]);

// const [encodeMap, decodeMap]: Array<Record<string, string>> = Array.from(
//   parents.keys()
// ).reduce(
//   ([encodeMap, decodeMap], key, index) => [
//     { ...encodeMap, [key]: index },
//     { ...decodeMap, [index]: key },
//   ],
//   [{}, {}]
// );
// const transformedEdges = Array.from(parents.entries()).map(([, edges]) =>
//   edges.map((vertex) => encodeMap[vertex])
// );
// const stronglyConnectedComponents = Object.entries(
//   scc(transformedEdges)
// ).reduce(
//   (accumulator, [propertyName, entry]) => ({
//     ...accumulator,
//     [propertyName]: entry.map((adjacent: Array<string>) =>
//       adjacent.map((key: string) => decodeMap[key])
//     ),
//   }),
//   {}
// );

// console.log(stronglyConnectedComponents);

const examples = [undirected, directed, parents];

export const exampleImgMap = [undirectedImg, directedImg, parentsImg];

export default examples;
