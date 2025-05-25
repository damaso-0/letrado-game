import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import GameProvider from "./states/GameProvider";

render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById("app")!
);
