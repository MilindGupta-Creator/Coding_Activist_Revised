"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Technology {
  id: string;
  name: string;
  category: string;
  color: string;
  connections: string[];
}

interface LearningPathNetworkProps {
  technologies?: Technology[];
  onTechClick?: (tech: Technology) => void;
}

export function LearningPathNetwork({ technologies = [], onTechClick }: LearningPathNetworkProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0e27");

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Point lights
    const light1 = new THREE.PointLight(0x3b82f6, 1, 50);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 1, 50);
    light2.position.set(-10, -10, -10);
    scene.add(light2);

    // Default sample data if none provided
    const defaultTechs: Technology[] = technologies.length > 0 ? technologies : [
      {
        id: "react",
        name: "React",
        category: "Frontend",
        color: "#61dafb",
        connections: ["nextjs", "typescript", "nodejs"],
      },
      {
        id: "nextjs",
        name: "Next.js",
        category: "Frontend",
        color: "#ffffff",
        connections: ["react", "typescript", "nodejs"],
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "Language",
        color: "#3178c6",
        connections: ["react", "nextjs", "nodejs"],
      },
      {
        id: "nodejs",
        name: "Node.js",
        category: "Backend",
        color: "#339933",
        connections: ["react", "nextjs", "typescript", "mongodb", "postgresql"],
      },
      {
        id: "mongodb",
        name: "MongoDB",
        category: "Database",
        color: "#47a248",
        connections: ["nodejs", "postgresql"],
      },
      {
        id: "postgresql",
        name: "PostgreSQL",
        category: "Database",
        color: "#336791",
        connections: ["nodejs", "mongodb"],
      },
      {
        id: "docker",
        name: "Docker",
        category: "DevOps",
        color: "#2496ed",
        connections: ["kubernetes", "aws"],
      },
      {
        id: "kubernetes",
        name: "Kubernetes",
        category: "DevOps",
        color: "#326ce5",
        connections: ["docker", "aws"],
      },
      {
        id: "aws",
        name: "AWS",
        category: "Cloud",
        color: "#ff9900",
        connections: ["docker", "kubernetes"],
      },
    ];

    // Create nodes (technologies)
    const nodes: THREE.Mesh[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Position nodes in a sphere
    const radius = 5;
    defaultTechs.forEach((tech, index) => {
      const phi = Math.acos(-1 + (2 * index) / defaultTechs.length);
      const theta = Math.sqrt(defaultTechs.length * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Node sphere
      const nodeGeometry = new THREE.SphereGeometry(0.4, 32, 32);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: tech.color,
        emissive: tech.color,
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.3,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      node.userData = { tech, position: new THREE.Vector3(x, y, z) };
      nodeGroup.add(node);
      nodes.push(node);

      // Label sprite
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Enable better text rendering
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Draw background with rounded corners effect
        const padding = 16;
        const cornerRadius = 10;
        const bgX = padding;
        const bgY = padding;
        const bgWidth = canvas.width - padding * 2;
        const bgHeight = canvas.height - padding * 2;
        
        ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
        ctx.beginPath();
        ctx.moveTo(bgX + cornerRadius, bgY);
        ctx.lineTo(bgX + bgWidth - cornerRadius, bgY);
        ctx.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + cornerRadius);
        ctx.lineTo(bgX + bgWidth, bgY + bgHeight - cornerRadius);
        ctx.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - cornerRadius, bgY + bgHeight);
        ctx.lineTo(bgX + cornerRadius, bgY + bgHeight);
        ctx.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - cornerRadius);
        ctx.lineTo(bgX, bgY + cornerRadius);
        ctx.quadraticCurveTo(bgX, bgY, bgX + cornerRadius, bgY);
        ctx.closePath();
        ctx.fill();
        
        // Add subtle border
        ctx.strokeStyle = `${tech.color}40`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw text with shadow for better readability
        const textX = canvas.width / 2;
        const textY = canvas.height / 2;
        
        // Text shadow/outline
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw text outline for contrast
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.lineWidth = 4;
        ctx.font = "600 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
        ctx.strokeText(tech.name, textX, textY);
        
        // Draw main text
        ctx.fillStyle = tech.color;
        ctx.shadowBlur = 0;
        ctx.fillText(tech.name, textX, textY);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      const labelOffset = new THREE.Vector3(x, y, z).normalize().multiplyScalar(0.8);
      sprite.position.set(x + labelOffset.x, y + labelOffset.y, z + labelOffset.z);
      sprite.scale.set(2.2, 0.55, 1);
      sprite.userData = { tech, isLabel: true };
      nodeGroup.add(sprite);
    });

    // Create connections (edges)
    const edges: THREE.Line[] = [];
    const edgeGroup = new THREE.Group();
    scene.add(edgeGroup);

    defaultTechs.forEach((tech) => {
      tech.connections.forEach((connectionId) => {
        const targetTech = defaultTechs.find((t) => t.id === connectionId);
        if (!targetTech) return;

        const sourceNode = nodes.find((n) => n.userData.tech.id === tech.id);
        const targetNode = nodes.find((n) => n.userData.tech.id === connectionId);
        if (!sourceNode || !targetNode) return;

        // Check if edge already exists (avoid duplicates)
        const edgeExists = edges.some((edge) => {
          const edgeData = edge.userData;
          return (
            (edgeData.source === tech.id && edgeData.target === connectionId) ||
            (edgeData.source === connectionId && edgeData.target === tech.id)
          );
        });

        if (edgeExists) return;

        const sourcePos = sourceNode.position;
        const targetPos = targetNode.position;

        const geometry = new THREE.BufferGeometry().setFromPoints([
          sourcePos,
          targetPos,
        ]);
        const material = new THREE.LineBasicMaterial({
          color: "#3b82f6",
          transparent: true,
          opacity: 0.3,
        });
        const edge = new THREE.Line(geometry, material);
        edge.userData = { source: tech.id, target: connectionId };
        edgeGroup.add(edge);
        edges.push(edge);
      });
    });

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;

    const handleMouseMove = (event: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObjects(nodes);

      if (intersects.length > 0) {
        const node = intersects[0].object as THREE.Mesh;
        const tech = node.userData.tech as Technology;
        setSelectedTech(tech);
        document.body.style.cursor = "pointer";
      } else {
        setSelectedTech(null);
        document.body.style.cursor = "default";
      }
    };

    const handleClick = () => {
      if (selectedTech && onTechClick) {
        onTechClick(selectedTech);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    let frameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Animate nodes
      nodes.forEach((node, index) => {
        const tech = node.userData.tech as Technology;
        const basePos = node.userData.position as THREE.Vector3;

        // Floating animation
        const offset = Math.sin(elapsed + index) * 0.1;
        node.position.y = basePos.y + offset;

        // Rotation
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;

        // Highlight selected
        const nodeMaterial = node.material as THREE.MeshStandardMaterial;
        if (selectedTech === tech) {
          node.scale.setScalar(1.5);
          nodeMaterial.emissiveIntensity = 1.0;
          
          // Highlight connected edges
          edges.forEach((edge) => {
            const edgeData = edge.userData;
            const material = edge.material as THREE.LineBasicMaterial;
            if (edgeData.source === tech.id || edgeData.target === tech.id) {
              material.opacity = 0.8;
              material.color.set("#60a5fa");
            } else {
              material.opacity = 0.1;
            }
          });
        } else {
          node.scale.setScalar(1.0);
          nodeMaterial.emissiveIntensity = 0.5;
        }
      });

      // Animate edges (pulsing)
      edges.forEach((edge, index) => {
        const opacity = 0.3 + Math.sin(elapsed * 2 + index) * 0.1;
        const material = edge.material as THREE.LineBasicMaterial;
        material.opacity = Math.max(0.1, opacity);
      });

      // Slow rotation of entire network
      nodeGroup.rotation.y += 0.001;
      edgeGroup.rotation.y += 0.001;

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || width;
      const newHeight = container.clientHeight || height;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      if (container && renderer.domElement.parentNode) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [technologies, onTechClick, selectedTech]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-[400px] rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950/90 overflow-hidden"
      />
      {selectedTech && (
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-white z-10 min-w-[250px]">
          <div className="font-bold text-lg mb-2" style={{ color: selectedTech.color }}>
            {selectedTech.name}
          </div>
          <div className="text-sm text-gray-400 mb-3">{selectedTech.category}</div>
          <div className="text-sm">
            <div className="text-gray-400 mb-2">Connected to:</div>
            <div className="flex flex-wrap gap-2">
              {selectedTech.connections.map((connId, idx) => {
                const connectedTech = technologies.find((t) => t.id === connId) || 
                  { name: connId, color: "#60a5fa" };
                return (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: `${connectedTech.color}20`,
                      color: connectedTech.color,
                    }}
                  >
                    {connectedTech.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        <div>Click on mouse to rotate the network and click on the technology to explore its connections</div>
      </div>
    </div>
  );
}

