import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Lamp() {
  const { scene } = useGLTF("/lampko.glb");

  const headRef = useRef();
  const glassRef = useRef();
  const { pointer } = useThree();

  const current = useRef({ x: 0, y: 0 });
  const input = useRef({ x: 0, y: 0 });

  const isMobileView = window.innerWidth < 640;

  const isMobile =
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === "Glava") {
        headRef.current = child;
      }

      if (child.name === "Staklo") {
        glassRef.current = child;
        child.material.emissive.set("#eeeeff");
        child.material.emissiveIntensity = 3;
      }
    });
  }, [scene]);

  useEffect(() => {
    // 🖱 desktop mouse
    const onMouse = (e) => {
      input.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // 📱 mobile gyro
    const onGyro = (e) => {
      input.current.x = (e.gamma || 0) / 45; // left-right tilt
      input.current.y = (e.beta || 0) / 45; // up-down tilt
    };

    if (isMobile) {
      window.addEventListener("deviceorientation", onGyro);
    } else {
      window.addEventListener("mousemove", onMouse);
    }

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onGyro);
    };
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!headRef.current) return;

    if (headRef.current) {
      current.current.x = THREE.MathUtils.lerp(
        current.current.x,
        pointer.x,
        0.08,
      );

      current.current.y = THREE.MathUtils.lerp(
        current.current.y,
        pointer.y,
        0.08,
      );

      //headRef.current.rotation.y = current.current.x * 1.2;

      const x = current.current.x;
      const rotY =
        x < 0
          ? x * Math.pow(Math.abs(x) + 0.001, 0.1) * 0.6
          : x * Math.pow(Math.abs(x) + 0.001, -0.3) * 1.6;

      headRef.current.rotation.y = rotY;
      headRef.current.rotation.z = current.current.y * 0.6;
    }

    if (glassRef.current) {
      // Pulsiranje svetla
      const breathe = Math.sin(t * 1.5) * 0.5 + 0.5;
      glassRef.current.material.emissiveIntensity = 0.8 + breathe * 0.25;
    }
  });

  return (
    <primitive
      object={scene}
      scale={0.45}
      position={
        isMobileView
          ? [0.8, -1.5, 0] // 👈 MOBILE: pomeri levo
          : [1.5, -1.25, 0] // DESKTOP
      }
      rotation={[0, -Math.PI / 1.25, 0]}
    />
  );
}
