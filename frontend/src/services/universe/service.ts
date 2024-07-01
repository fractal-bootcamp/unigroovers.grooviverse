const baseURL = "http://localhost:3000";
export const getUniverse = async () => {
  const response = await fetch(`${baseURL}/universe`);
  const universe = await response.json();
  console.log(universe);
  return universe;
};
