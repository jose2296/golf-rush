import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useMemo, Suspense } from "react";
import { Experience } from "./experience";

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
}; 

const Game = () => {
    const map = useMemo(
        () => [
          { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
          { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
          { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
          { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
          { name: Controls.jump, keys: ["Space"] },
        ],
        []
      );
    
      return (
        <div className="w-full h-[100vh]">
            <KeyboardControls map={map}>
            <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
                <color attach="background" args={["#ececec"]} />
                <Suspense>
                <Physics debug>
                    <Experience />
                </Physics>
                </Suspense>
            </Canvas>
            </KeyboardControls>
        </div>
      );
};

export default Game;
