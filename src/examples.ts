import loopImg from "./assets/loops.svg";
import multiplePathsImg from "./assets/multiple-paths.svg";
// import parentsImg from "./assets/parents.svg";

// Loops
const loopsEdges = new Map([
  ["a", ["b", "d"]],
  ["b", ["a", "c"]],
  ["c", ["b", "d"]],
  ["d", ["a", "c"]],
]);

// Multiple Paths
const multiplePathsEdges = new Map([
  ["a", ["b", "c", "d"]],
  ["b", ["a", "c", "d"]],
  ["c", ["a", "b", "d", "e"]],
  ["d", ["a", "b", "c", "e"]],
  ["e", ["c", "d"]],
]);

// Parents
// const parentsEdges = new Map([
//   ["a", ["b", "c", "d"]],
//   ["b", ["a", "c", "d"]],
//   ["c", ["a", "b", "d", "e"]],
//   ["d", ["a", "b", "c", "e"]],
//   ["e", ["c", "d"]],
// ]);

const examples = [
  loopsEdges,
  multiplePathsEdges,
  // parentsEdges,
];

export const exampleImgMap = [
  loopImg,
  multiplePathsImg,
  // parentsImg,
];

export default examples;
