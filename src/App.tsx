import { createContext, Fragment, useContext, useState } from "react";
import clsx from "clsx";

import { Graph } from "./graph";

// import lineImg from "./assets/line.svg";
// import lineJunctionImg from "./assets/line-junction.svg";
import lineEndImg from "./assets/line-end.svg";

const empty = <div className="h-10 w-10"></div>;
const end = <img src={lineEndImg} />;
// const junction = <img src={lineJunctionImg} />;
// const line = <img src={lineImg} />;

const edges = new Map([
  ["a", ["b", "d"]],
  ["b", ["a", "c"]],
  ["c", ["b"]],
  ["d", ["a", "c"]],
]);
const graph = new Graph(edges);

interface NodeProps {
  vertex: string;
  path?: Array<string>;
  shouldOpen?: boolean;
}

function Node({ vertex, path = [], shouldOpen = false }: NodeProps) {
  const settings = useContext(SettingsContext);
  const [isOpen, setOpen] = useState(shouldOpen);

  const toggleVertex = () => setOpen((prevOpen) => !prevOpen);

  const isDisabled = path.includes(vertex);
  const label = settings.showPath ? `${vertex} (${path.join(", ")})` : vertex;

  return (
    <>
      <div className="flex">
        {path.map((vertex, index) =>
          path.length - 1 !== index ? (
            <Fragment key={vertex}>{empty}</Fragment>
          ) : (
            <Fragment key={vertex}>{end}</Fragment>
          )
        )}
        <button
          className={clsx(
            "min-w-[40px] text-2xl text-center font-bold leading-10 capitalize cursor-pointer",
            isDisabled && "text-gray-500"
          )}
          onClick={toggleVertex}
          disabled={isDisabled}
        >
          {label}
        </button>
      </div>
      {isOpen &&
        graph
          .getVertexConnections(vertex)
          // .getVertexChildren(vertex, path[path.length - 1])
          .map((cVertex) => (
            <Node key={cVertex} vertex={cVertex} path={[...path, vertex]} />
          ))}
    </>
  );
}

const settingsDefaults = {
  showPath: false,
};

const SettingsContext = createContext(settingsDefaults);

function App() {
  const [showPath, setShowPath] = useState(settingsDefaults.showPath);

  const toggleShowPath = () => setShowPath((prevShowPath) => !prevShowPath);
  const toggleShowPathLabel = showPath ? "Hide paths" : "Show paths";

  return (
    <div className="m-10">
      <div className="mb-10">
        <div className="mb-2 text-3xl font-bold">Settings</div>
        <button
          className={clsx(
            "px-4 py-2 rounded-xl border-2 border-black",
            showPath && "bg-black text-white"
          )}
          onClick={toggleShowPath}
        >
          {toggleShowPathLabel}
        </button>
      </div>

      <SettingsContext.Provider value={{ showPath }}>
        <div className="flex flex-col">
          <Node vertex="a" shouldOpen />
        </div>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
