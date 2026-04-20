import React from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Lamp from "./Lamp";

function Hero() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* TEXT */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 40,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <h1>Drvena lampa</h1>
        <p>Unikatni dizajn</p>
      </div>

      {/* 3D SCENE */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#111111",
        }}
      >
        <Canvas camera={{ position: [0, 2.8, 7], fov: 38 }}>
          <ambientLight intensity={0.3} />

          <spotLight
            position={[-2, 0.75, 3]}
            angle={0.8}
            penumbra={1}
            intensity={3} // 👈 manje, da bloom radi
            distance={30}
          />

          <directionalLight position={[-3, 0.5, 3]} intensity={0.5} />

          <Lamp />

          {/* PIXAR BLOOM */}
          <EffectComposer>
            <Bloom
              intensity={1.8}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.8}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}

export default Hero;
