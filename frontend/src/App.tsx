import { TopBar } from "./components/TopBar/TopBar";
import { Canvas } from "./components/Canvas/Canvas";
import { SidePanel } from "./components/SidePanel/SidePanel";

function App() {
  return (
    <div className="flex h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Canvas />
        <SidePanel />
      </div>
    </div>
  );
}

export default App;
