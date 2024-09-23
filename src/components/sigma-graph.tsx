import { useEffect, useState, useRef } from 'react'
import { MultiDirectedGraph } from 'graphology'
import { Attributes, SerializedGraph } from "graphology-types";
import { NodeImageProgram, NodePictogramProgram } from "@sigma/node-image";
import { EdgeArrowProgram } from "sigma/rendering";
import Sigma from 'sigma'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CharacterProfile } from "@/components/character-profile"
import { X } from "lucide-react"
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion"
import jsonGraph from "@/graph.json"
import TATA from "@/assets/tataa.avif"
import MEICA from "@/assets/plant.png"
import LALA from "@/assets/lala.webp"
import KOA from "@/assets/koa copy.png"
import WUBY from "@/assets/oldwitch copy.png"
import TATABRO from "@/assets/tatabro.jpg"
import TATAMAMA from "@/assets/tatamama.jpeg"
import IDOLES from "@/assets/idoles.jpg"
import DAIGO from "@/assets/daigo.avif"
import INGE from "@/assets/ingeniero.avif"
import ETERNALS from "@/assets/eternals.jpg"
import TATA_FULL_IMAGE from "@/assets/tataful.avif"

export default function GraphComponent() {
  const [isDragging, setIsDragging] = useState<boolean | null>(null);
  const [selectedNode, setSelectedNode] = useState<Attributes | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const graph = MultiDirectedGraph.from(jsonGraph as SerializedGraph)

    graph.setNodeAttribute("tata", "image", TATA)
    graph.setNodeAttribute("meica", "image", MEICA)
    graph.setNodeAttribute("lala", "image", LALA)
    graph.setNodeAttribute("koa", "image", KOA)
    graph.setNodeAttribute("wuby", "image", WUBY)
    graph.setNodeAttribute("tatabro", "image", TATABRO)
    graph.setNodeAttribute("tatamama", "image", TATAMAMA)
    graph.setNodeAttribute("idoles", "image", IDOLES)
    graph.setNodeAttribute("daigo", "image", DAIGO)
    graph.setNodeAttribute("inge", "image", INGE)

    const container = document.getElementById("sigma-container") as HTMLElement
    const renderer = new Sigma(graph, container, {
      renderEdgeLabels: true,
      allowInvalidContainer: true,
      nodeProgramClasses: {
        image: NodeImageProgram,
        pictogram: NodePictogramProgram,
      },
      defaultEdgeType: "straight",
      edgeProgramClasses: {
        straight: EdgeArrowProgram,
      }
    })

    renderer.on("clickNode", ({ node }) => {
      const nodeAttributes = graph.getNodeAttributes(node)
      const cardInfo = {
        label: nodeAttributes.label,
        alias: nodeAttributes.alias,
        Info: nodeAttributes.info,
        image: nodeAttributes.image,
        color: nodeAttributes.color,
      }
      setSelectedNode(cardInfo)
    })

    let draggedNode: string | null = null;
    setIsDragging(false);

    renderer.on("downNode", (e) => {
      setIsDragging(true);
      draggedNode = e.node;
      graph.setNodeAttribute(draggedNode, "highlighted", true);
    });

    // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
    renderer.getMouseCaptor().on("mousemovebody", (e) => {
      if (isDragging || !draggedNode) return;

      // Get new position of node
      const pos = renderer.viewportToGraph(e);

      graph.setNodeAttribute(draggedNode, "x", pos.x);
      graph.setNodeAttribute(draggedNode, "y", pos.y);

      // Prevent sigma to move camera:
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    // On mouse up, we reset the autoscale and the dragging mode
    renderer.getMouseCaptor().on("mouseup", () => {
      if (draggedNode)
        graph.removeNodeAttribute(draggedNode, "highlighted");
      setIsDragging(false);
      draggedNode = null;
    });

    // Disable the autoscale at the first down interaction
    renderer.getMouseCaptor().on("mousedown", () => {
      if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());
    });

    // Cleanup
    return () => {
      renderer.kill()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setSelectedNode(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const closeCard = () => {
    setSelectedNode(null)
  }

  return (
    <div className="relative w-full h-[650px]">
    <AnimatePresence>
      <div id="sigma-container" className="w-full h-full" />
      {selectedNode && (
        <motion.div
            initial={{ x: "100%", y: -750}}
            animate={{ x: "60%", y: -750}}
            exit={{ x: "100%", y: -450}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
         >
        {selectedNode.alias === "Tata" ? (
        <Card className="w-[400px] h-[500px] bg-[#f5e6d3] border-none shadow-lg overflow-hidden relative" ref={cardRef}>
        <div className="absolute left-0 top-0 w-1/2 h-full">
          <img
            src={TATA_FULL_IMAGE}
            alt="tata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f5e6d3]"></div>
        </div>
        <div className="absolute right-0 top-0 w-3/4 h-full p-6 flex flex-col justify-between z-10">
          <div>
            <h2 className="text-4xl font-bold mb-4">Taiga Toragami</h2>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.youtube.com/@TaigaToragami" target="_blank" rel="noreferrer">
              <Button className="bg-[#e9a151] text-black hover:bg-[#e6c300]">
                YouTube <FaYoutube className="ml-2" />
              </Button>
              </a>
              <a href="https://x.com/TaigaToragami" target="_blank" rel="noreferrer">
              <Button className="bg-[#e9a151] text-black hover:bg-[#e6c300]">
                Twitter <FaXTwitter className="ml-2" />
              </Button>
              </a>
            </div>
              <CharacterProfile />
          </div>
        </div>
        </Card>
        ) : 
        <Card className="absolute w-64 text-left" ref={cardRef}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>{selectedNode.label}</CardTitle>
            <Button variant="ghost" size="icon" onClick={closeCard} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <img src={selectedNode.image} alt={selectedNode.label} className="w-full h-56 object-cover mb-4"
                  style={{background: selectedNode.color}} />
            <dl className="space-y-2">
            {selectedNode.alias === "idoles" ? <img src={ETERNALS} alt="idoles" className="w-full h-1/2 object-cover mb-4" /> : null}
              {Object.entries(selectedNode)
                .filter(([key]) => key !== 'label' && key !== 'image' && key !== 'color' && key !== 'alias')
                .map(([key, value]) => (
                <div key={key}>
                  <dt className="font-semibold">{key}:</dt>
                  <dd>{typeof value === 'number' ? value.toFixed(2) : value.toString()}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
        }
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}
