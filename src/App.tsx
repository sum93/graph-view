import clsx from "clsx";
import { createContext, useState } from "react";

import examples, { exampleImgMap } from "./examples";
import { ChildrenStrategy, Graph } from "./graph";
import Node from "./Node";

const graph = new Graph(examples[0]);

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
  const [exampleIndex, setExampleIndex] = useState(0);
  const handleSelectExample = (index: number) => {
    graph.setEdges(examples[index]);
    setExampleIndex(index);
  };

  const [childrenStrategy, setChildrenStrategy] = useState(
    settingsDefaults.childrenStrategy
  );
  const toggleChildrenStrategy = () => {
    setChildrenStrategy((prevChildrenStrategy) => {
      const nextChildrenStrategy =
        (prevChildrenStrategy + 1) % childrenStrategies.length;
      graph.setChildrenStrategy(childrenStrategies[nextChildrenStrategy]);
      return nextChildrenStrategy;
    });
  };

  const [showPath, setShowPath] = useState(settingsDefaults.showPath);
  const toggleShowPath = () => setShowPath((prevShowPath) => !prevShowPath);
  const toggleShowPathLabel = showPath ? "Hide paths" : "Show paths";

  return (
    <div className="m-10">
      <div className="mb-10">
        <div className="mb-2 text-3xl font-bold">Examples</div>
        <div className="flex flex-wrap gap-4">
          {exampleImgMap.map((img, index) => (
            <img
              className={clsx(
                "max-w-[250px] border-4 cursor-pointer",
                index === exampleIndex ? "border-solid" : "border-dashed"
              )}
              key={index}
              src={img}
              onClick={() => handleSelectExample(index)}
            />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="mb-2 text-3xl font-bold">Settings</div>
        <div className="flex flex-wrap gap-2">
          <button
            className={clsx(
              "px-4 py-2 rounded-xl border-2 border-black",
              showPath && "bg-black text-white"
            )}
            onClick={toggleShowPath}
          >
            {toggleShowPathLabel}
          </button>
          <button
            className={clsx("px-4 py-2 rounded-xl border-2 border-black")}
            onClick={toggleChildrenStrategy}
          >
            {childrenStrategyLabel[childrenStrategy]}
          </button>
        </div>
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
