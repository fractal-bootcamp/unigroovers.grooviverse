import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={original}>
    <App />
  </ThemeProvider>
);
