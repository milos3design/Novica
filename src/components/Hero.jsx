import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Lamp from "./Lamp";
import * as THREE from "three";

function Hero() {
  const [fade, setFade] = useState(0);
  if (typeof DeviceOrientationEvent?.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission();
  }

  useEffect(() => {
    const handleScroll = () => {
      const h = window.innerHeight;
      const progress = Math.min(window.scrollY / (h * 0.6), 1);
      setFade(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="top" className="relative min-h-[120vh]">
      {/* TEXT */}
      <div
        className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center 
                px-[5%] md:px-[10%] lg:pr-[45%] pointer-events-none"
      >
        <h1 className="font-naslov text-5xl md:text-6xl lg:text-8xl font-medium text-white leading-tight drop-shadow-2xl">
          Unikatni predmeti od drveta
        </h1>

        <p className="font-telo text-lg md:text-xl text-gray-300 mt-4  drop-shadow-md tracking-wider">
          nastali u tišini radionice, oblikovani rukom, inspirisani prirodom
        </p>
      </div>

      {/* 3D SCENA */}
      <div
        className="absolute inset-0"
        style={{
          background: `
    radial-gradient(ellipse 30% 40% at 65% 40%, #0d0d12 0%, transparent 70%),
    radial-gradient(ellipse 50% 70% at 35% 40%, #090d1d 0%, transparent 90%),
    radial-gradient(ellipse 60% 80% at 55% 10%, #1d1515 0%, #070406 70%, #010101 100%)
  `,
        }}
      >
        <Canvas shadows camera={{ position: [0, 2.8, 7], fov: 38 }}>
          <ambientLight intensity={0.25} />

          <spotLight
            position={[-2, 0.75, 3]}
            angle={0.8}
            penumbra={1}
            intensity={3}
            distance={30}
            castShadow
          />

          <directionalLight position={[-3, 0.5, 3]} intensity={1} />

          <Lamp />

          <EffectComposer>
            <Bloom
              intensity={1}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.6}
            />
          </EffectComposer>
        </Canvas>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #010101 100%)",
          opacity: fade,
          transition: "opacity 0.1s linear",
        }}
      />
    </div>
  );
}

export default Hero;
