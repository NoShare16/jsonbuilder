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
  addSubNode: (standartId: string) => void;
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
  addSubNode: (upperId) => {
    console.log("Adding sub-node to:", upperId);
    const nodes = get().nodes;
    const parent = nodes.find((node) => node.id === upperId);

    if (!parent) {
      console.error("Parent node not found");
      return; // Exit if no parent found
    }

    if (!Array.isArray(parent.ancestors)) {
      console.warn("Parent node has no valid ancestors array, initializing...");
      parent.ancestors = []; // Initialize to empty if undefined or invalid
    }

    console.log("before nodes:", nodes);
    const newId = `sub-${+new Date()}`;
    const level = parent.ancestors.length + 1;
    console.log("Level:", level);
    const getColorForLevel = (level: any) => {
      const hue = level * 137; // 137 is the golden angle approximation
      return `hsl(${hue % 360}, 70%, 50%)`;
    };

    const color = getColorForLevel(level);
    const newNode = {
      id: newId,
      type: "sub",
      //parentId: upperId,
      ancestors: parent ? [...parent.ancestors, upperId] : [upperId],
      //extent: "parent" as "parent",
      draggable: true,
      style: { width: 200 },
      position: { x: 0, y: 100 },
      data: {
        extendId: upperId,
        allIds: parent
          ? [...parent.ancestors, upperId, newId].join(",")
          : `${upperId},${newId}`,
        level: level,
        color: color,
      },
    };

    console.log("New node:", newNode);
    set({ nodes: [...nodes, newNode] });
    console.log("all nodes now:", get().nodes);
  },
}));

export default useStore;
