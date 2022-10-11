import clsx from "clsx";
import { createContext, useState } from "react";

import { ChildrenStrategy, Graph } from "./graph";
import Node from "./Node";

const edges = new Map([
  ["a", ["b", "d"]],
  ["b", ["a", "c"]],
  ["c", ["b"]],
  ["d", ["a", "c"]],
]);
const graph = new Graph(edges);

const childrenStrategies = [
  ChildrenStrategy.ALL_CONNECTIONS,
  ChildrenStrategy.HIDE_PARENT,
];
const childrenStrategyLabel = {
  [ChildrenStrategy.ALL_CONNECTIONS]: "Showing All Connections",
  [ChildrenStrategy.HIDE_PARENT]: "Hiding Parent",
};
const settingsDefaults = {
  graph,
  childrenStrategy: ChildrenStrategy.ALL_CONNECTIONS,
  showPath: false,
};

export const SettingsContext = createContext(settingsDefaults);

function App() {
  const [childrenStrategy, setChildrenStrategy] = useState(
    settingsDefaults.childrenStrategy
  );
  const [showPath, setShowPath] = useState(settingsDefaults.showPath);

  const toggleChildrenStrategy = () => {
    setChildrenStrategy((prevChildrenStrategy) => {
      const nextChildrenStrategy =
        (prevChildrenStrategy + 1) % childrenStrategies.length;
      graph.setChildrenStrategy(childrenStrategies[nextChildrenStrategy]);
      return nextChildrenStrategy;
    });
  };

  const toggleShowPath = () => setShowPath((prevShowPath) => !prevShowPath);
  const toggleShowPathLabel = showPath ? "Hide paths" : "Show paths";

  return (
    <div className="m-10">
      <div className="mb-10">
        <div className="mb-2 text-3xl font-bold">Settings</div>
        <button
          className={clsx(
            "px-4 py-2 rounded-xl border-2 border-black mr-2",
            showPath && "bg-black text-white"
          )}
          onClick={toggleShowPath}
        >
          {toggleShowPathLabel}
        </button>
        <button
          className={clsx("px-4 py-2 rounded-xl border-2 border-black mr-2")}
          onClick={toggleChildrenStrategy}
        >
          {childrenStrategyLabel[childrenStrategy]}
        </button>
      </div>

      <SettingsContext.Provider value={{ graph, childrenStrategy, showPath }}>
        <div className="flex flex-col">
          <Node vertex="a" shouldOpen />
        </div>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
