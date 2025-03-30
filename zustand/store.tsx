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
  updateNodeData: (nodeId: string, newData: Partial<NodeData>) => void;
  exportAsNestedJson: () => string;
  buildNestedJson: (
    node: Node<NodeData>,
    allNodes: Node<NodeData>[],
    allEdges: Edge[]
  ) => any;
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
    const { nodes, edges } = get();
    const parent = nodes.find((node) => node.id === upperId);

    if (!parent) {
      console.error("Parent node not found");
      return;
    }

    if (!Array.isArray(parent.ancestors)) {
      console.warn("Parent node has no valid ancestors array, initializing...");
      parent.ancestors = [];
    }

    const newId = `sub-${+new Date()}`;
    const level = parent.ancestors.length + 1;

    const getColorForLevel = (level: any) => {
      const hue = level * 137;
      return `hsl(${hue % 360}, 70%, 50%)`;
    };

    const color = getColorForLevel(level);

    const newPosition = {
      x: parent.position.x,
      y: parent.position.y + 150,
    };

    const newNode = {
      id: newId,
      type: "sub",
      ancestors: [...parent.ancestors, upperId],
      draggable: true,
      style: { width: 200 },
      position: newPosition,
      data: {
        extendId: upperId,
        allIds: [...parent.ancestors, upperId, newId].join(","),
        level: level,
        color: color,
      },
    };

    // Node hinzufügen und gleichzeitig eine Edge erstellen
    set({
      nodes: [...nodes, newNode],
      edges: addEdge({ source: upperId, target: newId }, edges),
    });
  },
  updateNodeData: (nodeId, newData) => {
    set((state) => {
      const updatedNodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              // bisherige Data
              ...node.data,
              // neue/überschreibende Felder
              ...newData,
            },
          };
        }
        return node;
      });

      return { nodes: updatedNodes };
    });
  },
  buildNestedJson(node, allNodes, allEdges) {
    // Alle Kanten, deren source === node.id -> Kinder
    const childrenEdges = allEdges.filter((edge) => edge.source === node.id);

    // Keine Kinder => gebe node.data.value aus, fallback: node.data.key oder ""
    if (childrenEdges.length === 0) {
      return node.data.value || "";
    }

    // Hat Kinder => Objekt aufbauen
    const result: Record<string, any> = {};
    childrenEdges.forEach((edge) => {
      const childNode = allNodes.find((n) => n.id === edge.target);
      if (!childNode) return;

      // childKey = childNode.data.key
      const childKey = childNode.data.key || "";
      const childValue = this.buildNestedJson(childNode, allNodes, allEdges);

      result[childKey] = childValue;
    });
    return result;
  },
  exportAsNestedJson: () => {
    const { nodes, edges } = get();

    // Root ist dein "standart"-Node
    const rootNode = nodes.find((n) => n.type === "standart");
    if (!rootNode) {
      // Falls keiner vorhanden => Leer
      return "{}";
    }

    // rootKey wird der data.key des Root
    const rootKey = rootNode.data.key || "root";
    const nested = get().buildNestedJson(rootNode, nodes, edges);

    // Gesamtobjekt => { [rootKey]: nested }
    const finalObj = { [rootKey]: nested };
    return JSON.stringify(finalObj, null, 2);
  },
}));

export default useStore;
