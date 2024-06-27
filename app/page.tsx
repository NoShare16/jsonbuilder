"use client";

import React from "react";
import { ReactFlowProvider } from "reactflow";
import Flow from "../components/Flow";
import useStore from "../zustand/store";
import "./globals.css";

const App = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  return (
    <main className="h-screen">
      <ReactFlowProvider>
        <div className="h-screen">
          <Flow nodes={nodes} edges={edges} />
        </div>
      </ReactFlowProvider>
    </main>
  );
};

export default App;
