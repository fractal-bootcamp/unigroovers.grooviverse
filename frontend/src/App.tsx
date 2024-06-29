// app.tsx file

import { useState } from "react";
import LandingPage from "./components/LandingPage/component";
import Universe from "./components/Universe/component";

function App() {
  const [mode, setMode] = useState<number>(0);

  if (mode === 1) {
    return <Universe setMode={setMode} />;
  }

  return <LandingPage setMode={setMode} />;
}
export default App;
