const baseURL = process.env.API_URL;
export const getUniverse = async () => {
  const response = await fetch(`${baseURL}/universe`);
  const universe = await response.json();
  console.log(universe);
  return universe;
};
