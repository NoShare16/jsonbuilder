import React, { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, { Background, Edge, Panel } from "reactflow";

import "reactflow/dist/style.css";
import "../app/globals.css";

import useStore from "../zustand/store";

import StandartNode from "../nodeTypes/StandartNode";
import SubNode from "../nodeTypes/SubNode";
const nodeTypes = {
  standart: StandartNode,
  sub: SubNode,
};

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  exportAsNestedJson: state.exportAsNestedJson,
});

function Flow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    exportAsNestedJson,
  } = useStore(useShallow(selector));
  const addStandartNode = useStore((state) => state.addStandartNode);
  const handleExport = () => {
    const nestedJson = exportAsNestedJson();
    console.log(nestedJson);
    // Optional: in ein Textfeld schreiben oder zum Download anbieten
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        {/*<Panel position="top-right">
          <button
            onClick={addStandartNode}
            className="mt-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Standart Node
          </button>
        </Panel>*/}
        <Panel position="top-right">
          <button
            onClick={handleExport}
            className="mt-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Export Json
          </button>
        </Panel>
        <Background />
      </ReactFlow>
    </>
  );
}

export default Flow;
