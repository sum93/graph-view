import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";

import { SettingsContext } from "./App";

import endImg from "./assets/line-end.svg";
import junctionImg from "./assets/line-junction.svg";
import lineImg from "./assets/line.svg";

const empty = <div className="h-10 w-10"></div>;
const end = <img src={endImg} />;
const junction = <img src={junctionImg} />;
const line = <img src={lineImg} />;

interface NodeProps {
  vertex: string;
  path?: Array<string>;
  shouldOpen?: boolean;
}

function Node({ vertex, path = [], shouldOpen = false }: NodeProps) {
  const { graph, isAllOpen, showPath } = useContext(SettingsContext);
  const [isOpen, setOpen] = useState(shouldOpen);

  useEffect(() => {
    if (
      !path.includes(vertex) &&
      graph.getNodeChildren(vertex, path).length !== 0 &&
      !shouldOpen
    ) {
      setOpen(isAllOpen);
    }
  }, [isAllOpen]);

  const toggleVertex = () => setOpen((prevOpen) => !prevOpen);

  const children = graph.getNodeChildren(vertex, path);
  const isLastPath = graph.getIsLastPath(vertex, path);
  const isDisabled = path.includes(vertex) || children.length === 0;
  const label = showPath ? `${vertex} (${path.join(", ")})` : vertex;

  return (
    <>
      <div className="flex">
        {isLastPath.map((isLast, index) => (
          <Fragment key={index}>
            {isLastPath.length - 1 !== index
              ? isLast
                ? empty
                : line
              : isLast
              ? end
              : junction}
          </Fragment>
        ))}
        <button
          className={clsx(
            "min-w-[40px] text-2xl text-center font-bold leading-10 capitalize cursor-pointer",
            isDisabled && "text-gray-400"
          )}
          onClick={toggleVertex}
          disabled={isDisabled}
        >
          {label}
        </button>
      </div>
      {isOpen &&
        children.map((cVertex) => (
          <Node key={cVertex} vertex={cVertex} path={[...path, vertex]} />
        ))}
    </>
  );
}

export default Node;
