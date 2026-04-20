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
  const time = useRef(0);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === "Glava") {
        headRef.current = child;
      }

      if (child.name === "Staklo") {
        glassRef.current = child;
        child.material.emissive = new THREE.Color("#ffffff");
        child.material.emissiveIntensity = 0.5;
      }
    });
  }, [scene]);

  useFrame(() => {
    time.current += 0.03;

    // -----------------------
    // 🧠 HEAD MOVEMENT
    // -----------------------
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

      headRef.current.rotation.y = current.current.x * 1.2;
      headRef.current.rotation.z = -current.current.y * -0.6;
    }

    // -----------------------
    // 🌟 PIXAR BREATHING LIGHT
    // -----------------------
    const breathe = Math.sin(time.current) * 0.5 + 0.5;
    const pulse = 0.6 + breathe * 1.2;

    if (glassRef.current) {
      glassRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[1.5, -1.75, 0]}
      rotation={[0, -Math.PI / 1.25, 0]}
    />
  );
}
