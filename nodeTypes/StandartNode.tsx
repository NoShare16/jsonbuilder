import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PlusIcon } from "@heroicons/react/24/solid";
import "../app/globals.css";
import useStore, { NodeData } from "../zustand/store";

function StandartNode({ id, data }: NodeProps<NodeData>) {
  console.log("StandartNode", id, data);
  const addStandartNode = useStore((state) => state.addStandartNode);
  const addSubNode = useStore((state) => state.addSubNode);

  return (
    <div className="bg-blue-500 border-2 border-blue-800 rounded-lg shadow-lg p-4 flex flex-col items-center transition duration-150 ease-in-out hover:shadow-xl">
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
      <p className="text-white text-sm font-semibold">Node {id}</p>
      <button
        onClick={() => addSubNode(id)}
        className="mt-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <PlusIcon className="h-4 w-4 text-white mr-2" />
        Add Node
      </button>
    </div>
  );
}

export default StandartNode;
