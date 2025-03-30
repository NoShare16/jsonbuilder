import React, { ChangeEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PlusIcon } from "@heroicons/react/24/solid";
import "../app/globals.css";
import useStore, { NodeData } from "../zustand/store";
import edges from "@/components/edges";

function StandartNode({ id, data }: NodeProps<NodeData>) {
  console.log("StandarNode", id, data);
  const addStandartNode = useStore((state) => state.addStandartNode);
  const addSubNode = useStore((state) => state.addSubNode);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { key: e.target.value });
  };
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { value: e.target.value });
  };
  const hasChildren = edges.some((edge) => edge.source === id);

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

      <div className="flex flex-col mt-2 text-white w-full">
        <label className="mb-1">Key</label>
        <input
          className="text-black px-1 py-0.5"
          type="text"
          value={data.key || ""}
          onChange={handleKeyChange}
        />
      </div>

      {!hasChildren && (
        <div className="flex flex-col w-full mb-2">
          <label className="text-white text-xs mb-1">Value</label>
          <input
            className="px-1 py-0.5"
            type="text"
            value={data.value || ""}
            onChange={handleValueChange}
          />
        </div>
      )}

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
