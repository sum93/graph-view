import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";

import { INode } from "./Graph";
import { SettingsContext } from "./App";

import endImg from "./assets/line-end.svg";
import junctionImg from "./assets/line-junction.svg";
import lineImg from "./assets/line.svg";

const empty = <div className="h-10 w-10"></div>;
const end = <img src={endImg} />;
const junction = <img src={junctionImg} />;
const line = <img src={lineImg} />;

interface NodeProps {
  data: INode;
}

function Node({
  data: { vertex, path, pathDetails, children, isLeaf, shouldOpen },
}: NodeProps) {
  const { isAllOpen, showPath } = useContext(SettingsContext);

  const [isOpen, setOpen] = useState(shouldOpen);
  const toggleVertex = () => setOpen((prevOpen) => !prevOpen);

  useEffect(() => {
    if (!isLeaf && !shouldOpen) {
      setOpen(isAllOpen);
    }
  }, [isAllOpen]);

  const label = showPath ? `${vertex} (${path.join(", ")})` : vertex;

  return (
    <>
      <div className="flex">
        {pathDetails.map(({ isLast }, index) => (
          <Fragment key={index}>
            {path.length - 1 !== index
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
            isLeaf && "text-gray-400"
          )}
          onClick={toggleVertex}
          disabled={isLeaf}
        >
          {label}
        </button>
      </div>
      {isOpen && children.map((node) => <Node key={node.vertex} data={node} />)}
    </>
  );
}

export default Node;
