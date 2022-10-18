import clsx from "clsx";
import { createContext, useEffect, useState } from "react";

import examples, { exampleImgMap } from "./examples";
import Graph from "./Graph";

import Node from "./Node";

const graph = new Graph(examples[0]);

const settingsDefaults = {
  isAllOpen: false,
  showPath: false,
  withParents: false,
};

export const SettingsContext = createContext(settingsDefaults);

function App() {
  const [isAllOpen, setAllOpen] = useState(settingsDefaults.isAllOpen);
  const toggleOpenAll = () => setAllOpen((prevOpenAll) => !prevOpenAll);
  const toggleOpenAllLabel = isAllOpen ? "Condense all" : "Expand all";

  const [showPath, setShowPath] = useState(settingsDefaults.showPath);
  const toggleShowPath = () => setShowPath((prevShowPath) => !prevShowPath);
  const toggleShowPathLabel = showPath ? "Hide paths" : "Show paths";

  const [exampleIndex, setExampleIndex] = useState(0);
  const handleSelectExample = setExampleIndex;

  const [withParents, setWithParents] = useState(settingsDefaults.withParents);
  const toggleChildrenStrategy = () => {
    setWithParents((prevWithParents) => !prevWithParents);
  };
  const withParentsLabel = withParents
    ? "With Parents Connections"
    : "Without Parents Connections";

  const [tree, setTree] = useState(graph.getTree("a"));
  useEffect(() => {
    graph.setEdges(examples[exampleIndex]);
    graph.setSettings({ withParents });

    setTree(graph.getTree(exampleIndex === 2 ? "*" : "a"));
  }, [exampleIndex, withParents]);

  return (
    <div className="m-10">
      <div className="mb-10">
        <div className="mb-2 text-3xl font-bold">Examples</div>
        <div className="flex flex-wrap gap-4">
          {exampleImgMap.map((img, index) => (
            <img
              className={clsx(
                "max-h-[250px] border-4 cursor-pointer hover:bg-gray-200",
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
              isAllOpen && "bg-black text-white"
            )}
            onClick={toggleOpenAll}
          >
            {toggleOpenAllLabel}
          </button>

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
            {withParentsLabel}
          </button>
        </div>
      </div>

      <SettingsContext.Provider value={{ withParents, isAllOpen, showPath }}>
        <div className="flex flex-col">
          <Node data={tree} />
        </div>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
