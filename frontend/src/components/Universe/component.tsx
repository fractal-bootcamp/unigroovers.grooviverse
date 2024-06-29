import { Physics } from "@react-three/cannon";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Hourglass } from "react95";
import { getUniverse } from "../../services/universe/service";
import { UniverseOutputDto } from "./types";
import { div } from "three/examples/jsm/nodes/Nodes.js";

type Fields = {
  setMode: Dispatch<SetStateAction<number>>;
};

const Universe = ({ setMode }: Fields) => {
  const [results, setResults] = useState<UniverseOutputDto | undefined>(
    undefined
  );

  const hydrateUniverse = async () => {
    const data = (await getUniverse()) as UniverseOutputDto;
    // setResults(data);
  };

  useEffect(() => {
    hydrateUniverse();
  }, []);

  if (!results) {
    return (
      <div className="flex flex-col items-center h-full w-full justify-evenly">
        <Hourglass size={50} style={{ margin: 20 }} />
        <Button
          primary
          onClick={() => {
            setResults(undefined);
            setMode(0);
          }}
        >
          HOME
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center p-6 gap-6">
      <div>G R O O V I V E R S E</div>
      <Button
        primary
        onClick={() => {
          setResults(undefined);
          setMode(0);
        }}
      >
        HOME
      </Button>
      <div className="h-full w-full bg-black">
        <Canvas>
          <OrbitControls />
          <Stars radius={150} count={112500} /> {/* universe */}
          <Stars radius={10} count={7500} /> {/* galaxy */}
          <Physics>
            <OrbitControls />
            {/* solar system */}
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
      </div>
    </div>
  );
};

export default Universe;
