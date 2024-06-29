import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Physics, useBox } from "@react-three/cannon";
import {
  OrbitControls,
  Stars,
  Box,
  Dodecahedron,
  Ring,
  Sphere,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Canvas>
    <OrbitControls />
    <Stars radius={150} count={100000} />
    <Stars radius={10} count={7500} />

    <Physics>
      <OrbitControls />
      <Sphere position={-20} scale={4} material-color="orange" />
      <Sphere position={-10} scale={2} material-color="#8C8C8C" />
      <Sphere position={-5} scale={2} material-color="#F0EAD6" />
      <Sphere position={0} scale={2} material-color="#00796B" />
      <Sphere position={5} scale={2} material-color="#D24C3A" />
      <Sphere position={10} scale={2} material-color="#DFAF86" />
      <Sphere position={15} scale={2} material-color="#D4CFA9" />
      <Sphere position={20} scale={2} material-color="#9AC1D2" />
      <Sphere position={25} scale={2} material-color="#4971B3" />
      <Sphere position={30} scale={2} material-color="#B8AFA9" />
    </Physics>
  </Canvas>
);
