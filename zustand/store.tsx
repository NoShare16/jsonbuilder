import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import initialNodes from "../components/nodes";
import initialEdges from "../components/edges";

export type NodeData = {};

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addStandartNode: () => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  addStandartNode: () => {
    const nodes = get().nodes;
    const standartCount = nodes.filter(
      (node) => node.type === "standart"
    ).length;
    const spacing = 250;
    const newNode = {
      id: `standartNode_${+new Date()}`,
      type: "standart",
      data: {
        value: "",
      },
      style: {},
      position: {
        x: standartCount * spacing, // Position next to the previous node on the x-axis
        y: 100, // Fixed y position, adjust as needed
      },
    };
    set({
      nodes: [...nodes, newNode],
    });
  },
}));

export default useStore;
