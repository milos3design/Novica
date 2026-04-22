import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Lamp() {
  const base = import.meta.env.BASE_URL;
  const { scene } = useGLTF(`${base}lampko.glb`);

  const headRef = useRef();
  const glassRef = useRef();
  const teloRef = useRef();

  const { pointer } = useThree();
  const current = useRef({ x: 0, y: 0 });
  const input = useRef({ x: 0, y: 0 });
  const gyroOffset = useRef({ x: 0, y: 0 });
  const gyroCalibrated = useRef(false);
  const isMobileView = window.innerWidth < 640;

  const isMobile =
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === "Telo") {
        teloRef.current = child;
      }

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
    const onGyro = (e) => {
      if (!gyroCalibrated.current) {
        gyroOffset.current.x = e.gamma || 0;
        gyroOffset.current.y = e.beta || 0;
        gyroCalibrated.current = true;
      }

      input.current.x = ((e.gamma || 0) - gyroOffset.current.x) / 45;
      input.current.y = ((e.beta || 0) - gyroOffset.current.y) / 45;
    };

    const onMouse = (e) => {
      input.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
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

    if (isMobile) {
      current.current.x = THREE.MathUtils.lerp(
        current.current.x,
        input.current.x,
        0.08,
      );
      current.current.y = THREE.MathUtils.lerp(
        current.current.y,
        input.current.y,
        0.08,
      );
    } else {
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
    }

    const x = current.current.x;
    const rotY =
      x < 0
        ? x * Math.pow(Math.abs(x) + 0.001, 0.1) * 0.6
        : x * Math.pow(Math.abs(x) + 0.001, -0.3) * 1.6;

    headRef.current.rotation.y = rotY;
    headRef.current.rotation.z = current.current.y * 0.6;

    if (glassRef.current) {
      const breathe = Math.sin(t * 1.5) * 0.5 + 0.5;
      glassRef.current.material.emissiveIntensity = 0.8 + breathe * 0.25;
    }

    const cycle = t % 20; // ciklus od 20 sekundi

    let target;

    if (cycle < 6) {
      // lagano ljuljanje
      target = Math.sin(cycle * 0.5) * 0.06 + Math.sin(cycle * 1.1) * 0.012;
    } else if (cycle < 13) {
      // vece ljuljanje, glatko
      const p = (cycle - 6) / 7;
      const amp = Math.sin(p * Math.PI) * 0.35;
      target = Math.sin(cycle * 0.4) * amp;
    } else {
      // vraćanje u lagano
      const p = (cycle - 13) / 7;
      const amp = 0.35 * (1 - p) + 0.06 * p;
      target = Math.sin(cycle * 0.4) * amp;
    }

    // lerp za glatke prelaze bez skokova
    current.current.z = THREE.MathUtils.lerp(
      current.current.z ?? 0,
      target,
      0.03,
    );
    teloRef.current.rotation.z = current.current.z;
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
