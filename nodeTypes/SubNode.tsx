import React, { ChangeEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PlusIcon } from "@heroicons/react/24/solid";
import "../app/globals.css";
import useStore, { NodeData } from "../zustand/store";
import edges from "@/components/edges";

function StandartNode({ id, data }: NodeProps<NodeData>) {
  console.log("SubNode:", id, data);
  const addSubNode = useStore((state) => state.addSubNode);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { key: e.target.value });
  };
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { value: e.target.value });
  };
  const handleEmptyValueTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateNodeData(id, {
      emptyValueType: e.target.value as NodeData["emptyValueType"],
    });
  };
  const hasChildren = edges.some((edge) => edge.source === id);

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
        <>
          <div className="flex flex-col mt-2 text-white w-full">
            <label className="mb-1">Value</label>
            <input
              className="text-black px-1 py-0.5"
              type="text"
              value={data.value || ""}
              onChange={handleValueChange}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-white text-xs mb-1">Empty Value Type</label>
            <select
              className="px-1 py-0.5 text-black"
              value={data.emptyValueType || "string"}
              onChange={handleEmptyValueTypeChange}
            >
              <option value="string">String </option>
              <option value="null">null</option>
              <option value="object">empty object </option>
              <option value="array">empty array </option>
            </select>
          </div>
        </>
      )}

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
