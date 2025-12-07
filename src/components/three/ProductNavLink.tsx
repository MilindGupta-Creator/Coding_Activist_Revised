"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ProductNavLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
  mobile?: boolean;
}

export const ProductNavLink = ({ href, className = "", onClick, mobile = false }: ProductNavLinkProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    coreMesh: THREE.Mesh;
    particles: THREE.Points;
    frameId: number;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasRef.current;
    if (!container || !canvasContainer) return;

    const width = mobile ? 180 : 140;
    const height = mobile ? 70 : 50;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 2.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    canvasContainer.appendChild(renderer.domElement);

    // Central glowing geometry (icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(0.5, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: isActive ? "#60a5fa" : "#3b82f6",
      emissive: isActive ? "#60a5fa" : "#3b82f6",
      emissiveIntensity: isActive ? 1.5 : 1.0,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: isActive ? 0.6 : 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Particle system for ambient glow
    const particleCount = 80;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 0.8 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color(isActive ? "#60a5fa" : "#3b82f6");
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: isActive ? 1.0 : 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Point lights for dynamic glow - reduced intensity
    const pointLight1 = new THREE.PointLight(isActive ? "#60a5fa" : "#3b82f6", isActive ? 2.5 : 1.8, 4);
    pointLight1.position.set(1, 1, 1);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(isActive ? "#a78bfa" : "#818cf8", isActive ? 2.0 : 1.5, 4);
    pointLight2.position.set(-1, -1, 1);
    scene.add(pointLight2);

    // Additional spot light for extra glow
    const spotLight = new THREE.SpotLight(isActive ? "#3b82f6" : "#2563eb", isActive ? 3.5 : 2.5, 5);
    spotLight.position.set(0, 2, 2);
    spotLight.angle = 0.3;
    scene.add(spotLight);

    let frameId: number = 0;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Rotate core mesh
      coreMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.3;
      coreMesh.rotation.y += 0.02;
      coreMesh.rotation.z = Math.cos(elapsed * 0.3) * 0.2;

      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 0.8 + Math.sin(elapsed + i) * 0.2;
        const theta = elapsed * 0.5 + (i / particleCount) * Math.PI * 2;
        const phi = (elapsed * 0.3 + i) % (Math.PI * 2);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Rotate particles
      particles.rotation.y += 0.005;
      particles.rotation.x = Math.sin(elapsed * 0.4) * 0.2;

      // Pulse effect - subtle animation
      const pulse = 1 + Math.sin(elapsed * 4) * 0.2;
      coreMesh.scale.setScalar(pulse);
      const baseIntensity = isActive ? 1.5 : 1.0;
      coreMaterial.emissiveIntensity = baseIntensity + Math.sin(elapsed * 4) * 0.4;
      const baseOpacity = isActive || isHovered ? 1.0 : 0.9;
      particlesMaterial.opacity = baseOpacity + Math.sin(elapsed * 3) * 0.1;

      // Move lights around
      pointLight1.position.x = Math.cos(elapsed * 0.8) * 1.5;
      pointLight1.position.y = Math.sin(elapsed * 0.6) * 1.5;
      pointLight2.position.x = Math.cos(elapsed * 0.8 + Math.PI) * 1.5;
      pointLight2.position.y = Math.sin(elapsed * 0.6 + Math.PI) * 1.5;
      spotLight.position.x = Math.sin(elapsed * 0.5) * 0.5;
      spotLight.position.y = 2 + Math.cos(elapsed * 0.4) * 0.3;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      coreMesh,
      particles,
      frameId,
    };

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (canvasContainer && renderer.domElement.parentNode) {
        canvasContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ambientLight.dispose();
      pointLight1.dispose();
      pointLight2.dispose();
      spotLight.dispose();
    };
  }, [isHovered, isActive, mobile]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas */}
      <div
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: mobile ? "180px" : "140px",
          height: mobile ? "70px" : "50px",
          zIndex: 0,
          opacity: isActive ? 0.85 : 0.7,
          filter: "blur(0.4px)",
        }}
      />
      {/* Link Content */}
      <Link
        href={href}
        onClick={onClick}
        className={`relative z-10 group ${mobile 
          ? `inline-flex items-center gap-2 text-left text-lg font-medium transition-all duration-300 py-3 px-5 rounded-lg border backdrop-blur-md ${
              isActive 
                ? "text-white bg-gradient-to-r from-blue-500/15 to-purple-500/15 border-blue-400/40 shadow-md shadow-blue-500/20" 
                : "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 hover:border-blue-400/70 hover:from-blue-500/25 hover:to-purple-500/25 hover:shadow-md hover:shadow-blue-500/25"
            }`
          : `inline-flex items-center gap-1.5 text-sm lg:text-base font-medium transition-all duration-300 px-3.5 py-2 rounded-lg border backdrop-blur-md relative overflow-hidden ${
              isActive 
                ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400/70 shadow-lg shadow-blue-500/30" 
                : "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 hover:border-blue-400/70 hover:from-blue-500/25 hover:to-purple-500/25 hover:shadow-md hover:shadow-blue-500/25"
            }`
        } ${className}`}
      >
        {/* Subtle animated gradient overlay */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        
        {/* Premium badge indicator */}
        <span className="relative flex items-center z-10">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>
          <span className="text-white font-medium">
            Product
          </span>
        </span>
        
        {/* Sparkle icon */}
        <svg 
          className="w-3.5 h-3.5 text-blue-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300 z-10"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </Link>
    </div>
  );
};

