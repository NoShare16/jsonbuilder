import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PlusIcon } from "@heroicons/react/24/solid";
import "../app/globals.css";
import useStore, { NodeData } from "../zustand/store";

function StandartNode({ id, data }: NodeProps<NodeData>) {
  console.log("SubNode:", id, data);
  const addSubNode = useStore((state) => state.addSubNode);

  const backgroundColor = data.color || "bg-green-500";

  return (
    <div
      className=" border-2 border-green-800 rounded-lg shadow-lg p-4 flex flex-col items-center transition duration-150 ease-in-out hover:shadow-xl"
      style={{ background: backgroundColor }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#ff5722",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />
      <Handle
        type="output"
        position={Position.Bottom}
        style={{
          background: "#ff5722",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />
      <input type="text" />
      <button
        onClick={() => addSubNode(id)}
        className="mt-2 flex items-center justify-center text-white bg-green-700 hover:bg-green-800 font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <PlusIcon className="h-4 w-4 text-white mr-2" />
        Add Node
      </button>
    </div>
  );
}

export default StandartNode;
