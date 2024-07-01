type UniverseEntity = {
  name: string;
  radius: number;
  starCount: number;
};

export type UniverseOutputDto = UniverseEntity & {
  galaxy: UniverseEntity & {
    solarSystem: {
      name: string;
      planetCount: number;
    };
  };
};
