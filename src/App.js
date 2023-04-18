import "./styles.css";
import React, { useEffect, useState } from "react";
import G6 from "@antv/g6";
import {
  Rect,
  Group,
  Circle,
  Text,
  createNodeFromReact,
  appenAutoShapeListener,
} from "@antv/g6-react-node";

let data = {
  nodes: [
    { id: "node0", label: "node0" },
    { id: "node1", label: "1" },
    { id: "node2", label: "2" },
    { id: "node3", label: "3" },
    { id: "node4", label: "4" },
    { id: "node5", label: "5" },
    { id: "node6", label: "6" },
    { id: "node7", label: "7" },
    { id: "node8", label: "8" },
    { id: "node9", label: "9" },
    { id: "node10", label: "10" },
    { id: "node11", label: "11" },
    { id: "node12", label: "12" },
    { id: "node13", label: "13" },
    { id: "node14", label: "14" },
    { id: "node15", label: "15" },
    { id: "node16", label: "16" }
  ],
  edges: [
    { source: "node0", target: "node1" },
    { source: "node0", target: "node2" },
    { source: "node0", target: "node3" },
    { source: "node0", target: "node4" },
    { source: "node0", target: "node5" },
    { source: "node1", target: "node6" },
    { source: "node1", target: "node7" },
    { source: "node2", target: "node8" },
    { source: "node2", target: "node9" },
    { source: "node2", target: "node10" },
    { source: "node2", target: "node11" },
    { source: "node2", target: "node12" },
    { source: "node2", target: "node13" },
    { source: "node3", target: "node14" },
    { source: "node3", target: "node15" },
    { source: "node3", target: "node16" }
  ]
};

const Card = ({ cfg }) => {
  const handleMouseEnter = (evt, node, shape, graph) => {
    console.log("graph", graph);
    graph.getNodes().forEach(function (nodeIn) {
      graph.updateItem(nodeIn, {
        dark: true
      });
    });
  };
  const { highlight = false, dark = false } = cfg;
  console.log("dark", dark);
  return (
    <Group>
      <Circle
        onMouseOver={handleMouseEnter}
        style={{
          r: 30,
          stroke: dark ? "#ffb20333" : "#1890ff",
          fill: "#fff",
          lineWidth: 2,
          cursor: "pointer"
        }}
        name="circle"
      >
        <Text>123</Text>
      </Circle>
    </Group>
  );
};
G6.registerNode("rect-xml2", {
  options: {
    stateStyles: {
      highlight: {
        opacity: 1,
        circle: {
          opacity: 1
        }
      },
      dark: {
        opacity: 0.2,
        circle: {
          opacity: 0.2
        }
      }
    }
  },
  ...createNodeFromReact(Card)
});

export default function App() {
  const ref = React.useRef(null);
  let graph = null;

  useEffect(() => {
    if (!graph) {
      //实例化 Graph
      graph = new G6.Graph({
        container: ref.current,
        // width: 500,
        height: 900,
        modes: {
          default: [
            { type: "drag-canvas" },
            { type: "zoom-canvas" },
            { type: "drag-node" }
          ]
        },
        layout: {
          type: "dagre",
          rankdir: "BT", // 可选，默认为图的中心
          // align: 'DL', // 可选
          nodesep: 50, // 可选
          ranksep: 90 // 可选
          // controlPoints: true
        },
        defaultNode: {
          type: "rect-xml2"
        },
        defaultEdge: {
          type: "quadratic",
          style: {
            stroke: "#ffb203",
            lineWidth: 3,
            endArrow: {
              path: G6.Arrow.triangle(4, 4, 8),
              d: 8
            }
          },
          edgeStateStyles: {
            highlight: {
              stroke: "#ffb203",
              lineWidth: 5
            },
            dark: {
              stroke: "#ffb20333"
            }
          },

          curveOffset: 100
          // controlPoints: [{ x: 10, y: 20 }]
        }
      });
    }

    appenAutoShapeListener(graph)
    graph.data(data);

    graph.render();

    function clearAllStats() {
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
      });
      graph.getEdges().forEach(function (edge) {
        graph.clearItemStates(edge);
      });
      graph.paint();
      graph.setAutoPaint(true);
    }

    graph.on("node:mouseenter", function (e) {
      const item = e.item;
      // console.log("item", item);
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
        graph.setItemState(node, "dark", true);
      });
      graph.setItemState(item, "dark", false);
      graph.setItemState(item, "highlight", true);
      graph.getEdges().forEach(function (edge) {
        if (edge.getSource() === item) {
          graph.setItemState(edge.getTarget(), "dark", false);
          graph.setItemState(edge.getTarget(), "highlight", true);
          graph.setItemState(edge, "highlight", true);
          edge.toFront();
        } else if (edge.getTarget() === item) {
          graph.setItemState(edge.getSource(), "dark", false);
          graph.setItemState(edge.getSource(), "highlight", true);
          graph.setItemState(edge, "highlight", true);
          edge.toFront();
        } else {
          graph.setItemState(edge, "highlight", false);
          graph.setItemState(edge, "dark", true);
        }
      });
      graph.paint();
      graph.setAutoPaint(true);
    });
    graph.on("node:mouseleave", clearAllStats);
    graph.on("canvas:click", clearAllStats);
  }, []);

  return <div ref={ref}></div>;
}
