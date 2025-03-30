import { Node } from "reactflow";

export default [
  {
    id: `standartNode_${+new Date()}`,
    type: "standart",
    data: {
      value: "",
    },
    position: {
      x: 0,
      y: 100,
    },
  },
] as Node[];
