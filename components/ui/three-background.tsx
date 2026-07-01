"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 350;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles configuration
    const maxParticles = 90;
    const particleData: Array<{ velocity: THREE.Vector3; numConnections: number }> = [];

    const positions = new Float32Array(maxParticles * 3);
    const colors = new Float32Array(maxParticles * 3);

    const r = 400; // spread range
    const rHalf = r / 2;

    for (let i = 0; i < maxParticles; i++) {
      const x = Math.random() * r - rHalf;
      const y = Math.random() * r - rHalf;
      const z = Math.random() * r - rHalf;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Teal colors for particles (20, 184, 166) -> #14b8a6
      colors[i * 3] = 20 / 255;
      colors[i * 3 + 1] = 184 / 255;
      colors[i * 3 + 2] = 166 / 255;

      particleData.push({
        velocity: new THREE.Vector3(
          (-1 + Math.random() * 2) * 0.25,
          (-1 + Math.random() * 2) * 0.25,
          (-1 + Math.random() * 2) * 0.25
        ),
        numConnections: 0
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Dynamic circular particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lines mesh
    const linePositions = new Float32Array(maxParticles * maxParticles * 3);
    const lineColors = new Float32Array(maxParticles * maxParticles * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse positions for hover interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse movements for smoothness
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Rotate scene slowly
      particles.rotation.y += 0.0008;
      linesMesh.rotation.y += 0.0008;

      const coords = particleGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < maxParticles; i++) {
        // Move particle
        coords[i * 3] += particleData[i].velocity.x;
        coords[i * 3 + 1] += particleData[i].velocity.y;
        coords[i * 3 + 2] += particleData[i].velocity.z;

        // Boundary checks
        if (Math.abs(coords[i * 3]) > rHalf) particleData[i].velocity.x *= -1;
        if (Math.abs(coords[i * 3 + 1]) > rHalf) particleData[i].velocity.y *= -1;
        if (Math.abs(coords[i * 3 + 2]) > rHalf) particleData[i].velocity.z *= -1;
      }

      // Update lines based on distance
      let vertexIndex = 0;
      let colorIndex = 0;
      let numConnected = 0;

      for (let i = 0; i < maxParticles; i++) {
        const x1 = coords[i * 3];
        const y1 = coords[i * 3 + 1];
        const z1 = coords[i * 3 + 2];

        for (let j = i + 1; j < maxParticles; j++) {
          const x2 = coords[j * 3];
          const y2 = coords[j * 3 + 1];
          const z2 = coords[j * 3 + 2];

          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

          // Connect if within limit
          if (dist < 80) {
            const alpha = 1.0 - dist / 80;

            // Define points
            linePositions[vertexIndex++] = x1;
            linePositions[vertexIndex++] = y1;
            linePositions[vertexIndex++] = z1;

            linePositions[vertexIndex++] = x2;
            linePositions[vertexIndex++] = y2;
            linePositions[vertexIndex++] = z2;

            // Colors (Teal gradient to transparent)
            lineColors[colorIndex++] = 20 / 255;
            lineColors[colorIndex++] = 184 / 255 * alpha;
            lineColors[colorIndex++] = 166 / 255 * alpha;

            lineColors[colorIndex++] = 20 / 255;
            lineColors[colorIndex++] = 184 / 255 * alpha;
            lineColors[colorIndex++] = 166 / 255 * alpha;

            numConnected++;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      lineGeometry.setDrawRange(0, numConnected * 2);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
}
