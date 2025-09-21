import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import "./bus3dview.css";

function Seat({ scene, position, isSelected }) {
  const seatClone = React.useMemo(() => {
    const cloneSeat = clone(scene);
    cloneSeat.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set(isSelected ? "green" : "gray");
      }
    });

    cloneSeat.rotation.y = Math.PI;

    return cloneSeat;
  }, [scene, isSelected]);

  return <primitive object={seatClone} position={position} scale={1} />;
}

export default function Bus3DView({ rows, lastRowSeats, selectedSeats }) {
  const { scene } = useGLTF("/assets/bus_seat.glb");
  const seats = [];

  let seatCounter = 0;

  // Main rows (front to back)
  rows.forEach((row, rowIndex) => {
    // Left side = 3 seats
    for (let i = 0; i < 3; i++) {
      seats.push(
        <Seat
          key={seatCounter}
          scene={scene}
          position={[i * 0.6, 0.2, -rowIndex * 0.8]}
          isSelected={selectedSeats.includes(seatCounter)}
        />
      );
      seatCounter++;
    }

    // Right side = 2 seats
    for (let i = 0; i < 2; i++) {
      seats.push(
        <Seat
          key={seatCounter}
          scene={scene}
          position={[i * 0.6 + 2.2, 0.2, -rowIndex * 0.8]}
          isSelected={selectedSeats.includes(seatCounter)}
        />
      );
      seatCounter++;
    }
  });

  // Last row at the back
  for (let i = 0; i < lastRowSeats; i++) {
    seats.push(
      <Seat
        key={seatCounter}
        scene={scene}
        position={[i * 0.6, 0.2, -(rows.length) * 0.8]}
        isSelected={selectedSeats.includes(seatCounter)}
      />
    );
    seatCounter++;
  }

  return (
    <div className="bus-3d-view">
      <Canvas camera={{ position: [4, 4, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />

        {/* Bus floor */}
        <mesh position={[1.3, -0.2, -(rows.length * 0.8) / 2]}>
          <boxGeometry args={[4.5, 0.1, rows.length * 0.8 + 1]} />
          <meshStandardMaterial color="#888" />
        </mesh>

        {seats}
        <OrbitControls 
            enablePan={false}             // disable panning
            minDistance={3}               // min zoom distance
            maxDistance={10}              // max zoom distance
            minPolarAngle={Math.PI / 4}   // limit vertical rotation (up/down)
            maxPolarAngle={Math.PI / 2}   // limit vertical rotation
            minAzimuthAngle={-Math.PI / 4} // limit horizontal rotation (left)
            maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
