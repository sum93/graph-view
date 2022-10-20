import clsx from "clsx";
import { createContext, useEffect, useState } from "react";

import examples, { exampleImgMap } from "./examples";
import Graph from "./Graph";

import ToggleButton from "./Button";
import Node from "./Node";

const graph = new Graph(examples[0]);

const settingsDefaults = {
  isAllOpen: false,
  withPath: false,
  withParents: false,
};

export const SettingsContext = createContext(settingsDefaults);

function App() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const handleSelectExample = setExampleIndex;

  const [isAllOpen, setAllOpen] = useState(settingsDefaults.isAllOpen);
  const toggleOpenAll = () => setAllOpen((prevOpenAll) => !prevOpenAll);
  const openAllLabel = isAllOpen ? "Condense all" : "Expand all";

  const [withPath, setWithPath] = useState(settingsDefaults.withPath);
  const toggleWithPath = () => setWithPath((prevShowPath) => !prevShowPath);
  const withPathLabel = withPath ? "Hide paths" : "Show paths";

  const [withParents, setWithParents] = useState(settingsDefaults.withParents);
  const toggleWithParents = () => {
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
              key={index}
              src={img}
              className={clsx(
                "max-h-[250px] border-4 cursor-pointer hover:bg-gray-200",
                index === exampleIndex ? "border-solid" : "border-dashed"
              )}
              onClick={() => handleSelectExample(index)}
            />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="mb-2 text-3xl font-bold">Settings</div>
        <div className="flex flex-wrap gap-2">
          <ToggleButton isActive={isAllOpen} onClick={toggleOpenAll}>
            {openAllLabel}
          </ToggleButton>

          <ToggleButton isActive={withPath} onClick={toggleWithPath}>
            {withPathLabel}
          </ToggleButton>

          <ToggleButton isActive={withParents} onClick={toggleWithParents}>
            {withParentsLabel}
          </ToggleButton>
        </div>
      </div>

      <SettingsContext.Provider value={{ withParents, isAllOpen, withPath }}>
        <div className="flex flex-col">
          <Node data={tree} />
        </div>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
