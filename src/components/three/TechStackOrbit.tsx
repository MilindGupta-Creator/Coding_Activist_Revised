 "use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TECH_COLORS: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#ffffff",
  JavaScript: "#f7df1e",
  NPM: "#cb3837",
  TypeScript: "#3178c6",
};

// These paths assume you add logo images under `public/assets/tech/`
//   - public/assets/tech/react-logo.png
//   - public/assets/tech/nextjs-logo.png
//   - public/assets/tech/js-logo.png
const TECH_LOGO_PATHS: Record<string, string> = {
  React: "/assets/tech/react-logo.png",
  "Next.js": "/assets/tech/nextjs-logo.png",
  JavaScript: "/assets/tech/js-logo.png",
  NPM: "/assets/tech/npm-logo.png",
  TypeScript: "/assets/tech/ts-logo.png",
};

const TECH_LABELS = Object.keys(TECH_COLORS);

type TechSprite = {
  sprite: THREE.Sprite;
  angleOffset: number;
  texture: THREE.Texture;
  material: THREE.SpriteMaterial;
};

export function TechStackOrbit() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020617");

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 4);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(4, 8, 4);
    scene.add(directionalLight);

    // Central polyhedron
    const coreGeometry = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#38bdf8",
      emissive: "#0ea5e9",
      emissiveIntensity: 0.9,
      metalness: 0.5,
      roughness: 0.2,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.position.set(0, 0.25, 0);
    scene.add(coreMesh);

    // Orbit ring (simple line loop)
    const orbitRadius = 1.35;
    const orbitSegments = 96;
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitVertices: number[] = [];
    for (let i = 0; i <= orbitSegments; i++) {
      const angle = (i / orbitSegments) * Math.PI * 2;
      orbitVertices.push(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      );
    }
    orbitGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(orbitVertices, 3)
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: "#1d4ed8",
      linewidth: 2,
    });
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    scene.add(orbitLine);

    // Helper to generate a circular "logo" sprite using canvas as a fallback,
    // then replace it with a real logo texture if the image is available.
    const createTechSprite = (
      label: string,
      color: string,
      logoPath?: string
    ): { sprite: THREE.Sprite; texture: THREE.Texture; material: THREE.SpriteMaterial } => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Fallback: simple colored circle without text
        const geometry = new THREE.SphereGeometry(0.22, 32, 32);
        const material = new THREE.SpriteMaterial({ color });
        const sprite = new THREE.Sprite(material);
        return { sprite, texture: new THREE.CanvasTexture(canvas), material };
      }

      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, size, size);

      // Outer glow ring
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 20, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Text that roughly represents the logo
      ctx.fillStyle = "#020617";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 72px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

      let displayText = label;
      if (label === "JavaScript") displayText = "JS";
      if (label === "Next.js") displayText = "Next";
      if (label === "NPM") displayText = "npm";
      if (label === "TypeScript") displayText = "TS";

      ctx.fillText(displayText, size / 2, size / 2 + 6);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.9, 0.9, 1);

      // If a real logo path is provided, try to load and apply it.
      if (logoPath) {
        const loader = new THREE.TextureLoader();
        loader.load(
          logoPath,
          (logoTexture) => {
            logoTexture.anisotropy =
              (renderer.capabilities as any).getMaxAnisotropy?.() ?? 1;
            material.map = logoTexture;
            material.needsUpdate = true;
          },
          undefined,
          () => {
            // Ignore errors; keep the canvas-based badge as fallback.
          }
        );
      }

      return { sprite, texture, material };
    };

    // Tech "logo" sprites that orbit around the core
    const techSprites: TechSprite[] = [];
    TECH_LABELS.forEach((label, index) => {
      const color = TECH_COLORS[label];
      const logoPath = TECH_LOGO_PATHS[label];
      const { sprite, texture, material } = createTechSprite(
        label,
        color,
        logoPath
      );
      scene.add(sprite);

      techSprites.push({
        sprite,
        angleOffset: (index / TECH_LABELS.length) * Math.PI * 2,
        texture,
        material,
      });
    });

    let frameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      coreMesh.rotation.x += 0.005;
      coreMesh.rotation.y += 0.01;

      techSprites.forEach(({ sprite, angleOffset }) => {
        const angle = elapsed * 0.6 + angleOffset;
        sprite.position.set(
          Math.cos(angle) * orbitRadius,
          0.25 + Math.sin(elapsed * 1.2) * 0.15,
          Math.sin(angle) * orbitRadius
        );
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
      container.removeChild(renderer.domElement);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      techSprites.forEach(({ sprite, texture, material }) => {
        scene.remove(sprite);
        texture.dispose();
        material.dispose();
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="w-full h-[260px] md:h-[320px] rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950/90 overflow-hidden"
      />

      <div className="text-center text-xs md:text-sm text-gray-400">
        Built with{" "}
        <span className="font-medium text-blue-300">React</span>,{" "}
        <span className="font-medium text-white">Next.js 14</span>,{" "}
        <span className="font-medium text-sky-300">TypeScript</span> &{" "}
        <span className="font-medium text-indigo-300">Three.js</span>
      </div>
    </div>
  );
}

