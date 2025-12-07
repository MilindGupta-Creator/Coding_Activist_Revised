"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FloatingShapesProps {
  shapeCount?: number;
  colors?: string[];
}

export function FloatingShapes({ 
  shapeCount = 8, 
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"] 
}: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const shapes: THREE.Mesh[] = [];
    const geometries = [
      () => new THREE.BoxGeometry(0.5, 0.5, 0.5),
      () => new THREE.IcosahedronGeometry(0.4, 0),
      () => new THREE.OctahedronGeometry(0.4, 0),
      () => new THREE.TetrahedronGeometry(0.4, 0),
    ];

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i % geometries.length]();
      const color = colors[i % colors.length];
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.7,
      });

      const shape = new THREE.Mesh(geometry, material);
      const angle = (i / shapeCount) * Math.PI * 2;
      const radius = 3;
      shape.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        (Math.random() - 0.5) * 2
      );
      shape.userData = { 
        basePosition: shape.position.clone(),
        speed: 0.5 + Math.random() * 0.5,
        rotationSpeed: 0.01 + Math.random() * 0.02,
      };
      scene.add(shape);
      shapes.push(shape);
    }

    let frameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      shapes.forEach((shape, index) => {
        const { basePosition, speed, rotationSpeed } = shape.userData;
        
        // Floating animation
        shape.position.y = basePosition.y + Math.sin(elapsed * speed + index) * 0.5;
        shape.position.x = basePosition.x + Math.cos(elapsed * speed * 0.7 + index) * 0.3;
        
        // Rotation
        shape.rotation.x += rotationSpeed;
        shape.rotation.y += rotationSpeed;
        shape.rotation.z += rotationSpeed * 0.5;
      });

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
      if (container && renderer.domElement.parentNode) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
    };
  }, [shapeCount, colors]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

