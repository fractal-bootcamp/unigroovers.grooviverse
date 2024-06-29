import { Physics } from "@react-three/cannon";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Hourglass } from "react95";
import { getUniverse } from "../../services/universe/service";
import { UniverseOutputDto } from "./types";

type Fields = {
  setMode: Dispatch<SetStateAction<number>>;
};

const Universe = ({ setMode }: Fields) => {
  const [results, setResults] = useState<UniverseOutputDto | undefined>(
    undefined
  );

  const planetArray = new Array(results?.galaxy.solarSystem.planetCount).fill(
    0
  );

  const colorArray: string[] = [
    "#8C8C8C",
    "#F0EAD6",
    "#00796B",
    "#D24C3A",
    "#DFAF86",
    "#D4CFA9",
    "#9AC1D2",
    "#4971B3",
    "#B8AFA9",
    "#59814F",
    "#D17A22",
  ];

  const hydrateUniverse = async () => {
    const data = (await getUniverse()) as UniverseOutputDto;
    setResults(data);
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
          <Stars radius={results.radius} count={results.starCount} />{" "}
          {/* universe */}
          <Stars
            radius={results.galaxy.radius}
            count={results.galaxy.starCount}
          />{" "}
          {/* galaxy */}
          <Physics>
            <OrbitControls />
            {/* solar system */}
            {planetArray.map((_planet, i) => {
              if (i === 0) {
                return (
                  <Sphere
                    key={i}
                    position={-25}
                    scale={4}
                    material-color="orange"
                  />
                );
              }

              return (
                <Sphere
                  key={i}
                  position={i * 5 - (planetArray.length * 5) / 2}
                  scale={2}
                  material-color={colorArray[i]}
                />
              );
            })}
          </Physics>
        </Canvas>
      </div>
    </div>
  );
};

export default Universe;
