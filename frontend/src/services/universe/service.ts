const getUniverse = async () => {
  const response = await fetch(`http://localhost:3000/universe`);
  const universe = await response.json();
  console.log(universe);
  return universe;
};

getUniverse();
