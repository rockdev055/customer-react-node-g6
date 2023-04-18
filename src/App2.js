import "./styles.css";
import React, { useEffect, useState } from "react";
import G6 from "@antv/g6";
import {
  Rect,
  Group,
  Circle,
  Text,
  Image,
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

const Tag = ({ text, color }) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width: 'auto',
      radius: [4],
      margin: [0, 8],
    }}
  >
    <Text style={{ fill: '#fff', fontSize: 10 }}>{text}</Text>
  </Rect>
);

const Card = ({ cfg }) => {
  const { collapsed = false } = cfg;

  return (
    <Group draggable>
      <Rect
        style={{
          width: 400,
          height: 'auto',
          fill: '#fff',
          stroke: '#ddd',
          shadowColor: '#eee',
          shadowBlur: 30,
          radius: [8],
          justifyContent: 'center',
          padding: [18, 0],
        }}
        onMouseEnter={() => {
          console.log(1)
        }}
        draggable
      >
        <Text
          style={{
            fill: '#000',
            margin: [0, 24],
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          这是一个卡片
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: [12, 24] }}>
          我是一段特别特别特别特别特别特别特别长的描述
        </Text>
        {collapsed && (
          <Group>
            <Image
              style={{
                img:
                  'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
                width: 200,
                height: 200,
                margin: [24, 'auto'],
              }}
            />
            <Rect
              style={{ width: 'auto', flexDirection: 'row', padding: [4, 12] }}
            >
              <Tag color="#66ccff" text="我是" />
              <Tag color="#66ccff" text="很多个" />
              <Tag color="#66ccff" text="很多个的" />
              <Tag color="#66ccff" text="标签" />
            </Rect>
          </Group>
        )}
        <Circle
          style={{
            position: 'absolute',
            x: 380,
            y: 20,
            r: 5,
            fill: collapsed ? 'blue' : 'green',
          }}
        >
          <Text
            style={{
              fill: '#fff',
              fontSize: 10,
              margin: [-6, -3, 0],
              cursor: 'pointer',
            }}
            onClick={(evt, node, shape, graph) => {
              graph.updateItem(node, {
                collapsed: !collapsed,
              });
            }}
          >
            {collapsed ? '-' : '+'}
          </Text>
        </Circle>
      </Rect>
    </Group>
  );
};
G6.registerNode("rect-xml2", createNodeFromReact(Card));

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

    
  }, []);

  return <div ref={ref}></div>;
}
