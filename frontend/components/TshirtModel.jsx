// "use client";
// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";

// export default function TshirtModel(props) {
//   const { nodes, materials } = useGLTF("/models/t_shirt.glb");
//   return (
//     <group {...props} dispose={null}>
//       <group>
//         <group position={[0, -10, 0]} scale={[8,8,8]}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_6.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_8.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_10.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_11.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_12.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_14.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_15.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_16.geometry}
//             material={materials.Body_FRONT_2664}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_18.geometry}
//             material={materials.Sleeves_FRONT_2669}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_20.geometry}
//             material={materials.Sleeves_FRONT_2669}
//           />
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/models/t_shirt.glb");

// "use client";
// import React, { useRef, useState } from "react";
// import { useGLTF, useTexture, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import { useDrag } from "@use-gesture/react";

// export default function TshirtModel({ imageUrl, ...props }) {
//   const { nodes, materials } = useGLTF("/models/t_shirt.glb");
//   const texture = useTexture(imageUrl);
//   texture.flipY = false;

//   // ** State for Decal Position & Rotation **
//   const [decalPosition, setDecalPosition] = useState([0, 1.3, 0.1]); // Adjust position
//   const decalRef = useRef();
//   const tshirtMeshRef = useRef(); // Reference to T-shirt mesh

//   // ** Dragging Logic **
//   const bindDrag = useDrag(({ offset: [x, y] }) => {
//     setDecalPosition([x * 0.01, y * -0.01, 0.1]); // Convert drag offset to 3D position
//   });

//   useFrame(() => {
//     if (decalRef.current) {
//       decalRef.current.position.set(...decalPosition);
//     }
//   });

//   return (
//     <group {...props} dispose={null}>
//       <group>
//         <group position={[0, -10, 0]} scale={[8, 8, 8]}>
//           {[
//             "Object_6",
//             "Object_8",
//             "Object_10",
//             "Object_11",
//             "Object_12",
//             "Object_14",
//             "Object_15",
//             "Object_16",
//           ].map((obj) => (
//             <mesh
//               key={obj}
//               ref={tshirtMeshRef} // Attach reference to main mesh
//               geometry={nodes[obj].geometry}
//               material={materials.Body_FRONT_2664}
//             >
//               {/* DECAL (Image on the T-shirt) */}
//               <Decal
//                 ref={decalRef}
//                 {...bindDrag()} // Make draggable
//                 position={decalPosition}
//                 scale={[0.1,0.1,0.1]} // Adjust scale as needed
//                 map={texture}
//                 depthTest={false}
//                 depthWrite={true}
//               />
//             </mesh>
//           ))}
//           {["Object_18", "Object_20"].map((obj) => (
//             <mesh
//               key={obj}
//               ref={tshirtMeshRef}
//               geometry={nodes[obj].geometry}
//               material={materials.Sleeves_FRONT_2669}
//             >
//             </mesh>
//           ))}
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/models/t_shirt.glb");

// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { useGLTF, useTexture, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import { useDrag } from "@use-gesture/react";

// export default function TshirtModel({ imageUrl, ...props }) {
//   const { nodes, materials } = useGLTF("/models/t_shirt.glb");
//   const texture = useTexture(imageUrl);
//   texture.flipY = false;

//   const tshirtMeshRef = useRef();
//   const decalRef = useRef();

//   // ** State for Position & Scale of Decal **
//   const [decalPosition, setDecalPosition] = useState([0, 0, 0.2]);
//   const [decalScale, setDecalScale] = useState([1, 1, 1]);
//   const [bounds, setBounds] = useState(null); // Store model bounds

//   // ** Calculate Model Size & Adjust Decal Position to Center (Chest Area) **
//   useEffect(() => {
//     if (tshirtMeshRef.current) {
//       const bbox = new THREE.Box3().setFromObject(tshirtMeshRef.current);
//       const size = bbox.getSize(new THREE.Vector3());
//       const center = bbox.getCenter(new THREE.Vector3());

//       // Adjust scale: Decal is about 30% of T-shirt width
//       const scaleFactor = size.x * 0.3;
//       setDecalScale([scaleFactor, scaleFactor, scaleFactor]);

//       // Store bounding limits for decal movement
//       setBounds({
//         minX: center.x - size.x * 0.3,
//         maxX: center.x + size.x * 0.3,
//         minY: center.y - size.y * 0.2,
//         maxY: center.y + size.y * 0.3,
//       });

//       // Place the decal at the chest (above center)
//       setDecalPosition([center.x, center.y + size.y * 0.2, center.z + 0.1]);
//     }
//   }, []);

//   // ** Dragging Logic (Clamped to Stay Inside Model) **
//   const bindDrag = useDrag(({ offset: [x, y] }) => {
//     setDecalPosition((prev) => {
//       if (!bounds) return prev; // Don't move if bounds are not set

//       const newX = THREE.MathUtils.clamp(prev[0] + x * 0.0001, bounds.minX, bounds.maxX);
//       const newY = THREE.MathUtils.clamp(prev[1] - y * 0.0001, bounds.minY, bounds.maxY);

//       return [newX, newY, prev[2]];
//     });
//   });

//   useFrame(() => {
//     if (decalRef.current) {
//       decalRef.current.position.set(...decalPosition);
//     }
//   });

//   return (
//     <group {...props} dispose={null}>
//       <group>
//         <group position={[0, -10, 0]} scale={[8, 8, 8]}>
//           {[
//             "Object_6",
//             "Object_8",
//             "Object_10",
//             "Object_11",
//             "Object_12",
//             "Object_14",
//             "Object_15",
//             "Object_16",
//           ].map((obj) => (
//             <mesh
//               key={obj}
//               ref={tshirtMeshRef}
//               geometry={nodes[obj].geometry}
//               material={materials.Body_FRONT_2664}
//             >
//               {/* DECAL (Image on the T-shirt) */}
//               <Decal
//                 ref={decalRef}
//                 {...bindDrag()} // Make draggable but restricted to bounds
//                 position={decalPosition}
//                 scale={decalScale}
//                 map={texture}
//                 depthTest={false}
//                 depthWrite={true}
//               />
//             </mesh>
//           ))}
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/models/t_shirt.glb");

"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function TshirtModel({ imageUrl, ...props }) {
  const { nodes, materials } = useGLTF("/models/t_shirt.glb");
  const texture = useTexture(imageUrl);
  texture.flipY = false;

  const tshirtMeshRef = useRef();
  const decalRef = useRef();

  const [decalPosition, setDecalPosition] = useState([0, 0, 0.2]);
  const [decalScale, setDecalScale] = useState([0.1, 0.1, 0.1]);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (tshirtMeshRef.current) {
      const bbox = new THREE.Box3().setFromObject(tshirtMeshRef.current);
      const size = bbox.getSize(new THREE.Vector3());
      const center = bbox.getCenter(new THREE.Vector3());

      const scaleFactor = size.x * 0.3;
      setDecalScale([scaleFactor, scaleFactor, scaleFactor]);

      setBounds({
        minX: center.x - size.x * 0.3,
        maxX: center.x + size.x * 0.3,
        minY: center.y - size.y * 0.2,
        maxY: center.y + size.y * 0.3,
      });

      setDecalPosition([center.x, center.y + size.y * 0.2, center.z + 0.1]);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setDecalPosition((prev) => {
        if (!bounds) return prev;

        const speed = event.shiftKey ? 0.02 : 0.01;
        let [x, y, z] = prev;

        if (event.key === "ArrowUp")
          y = THREE.MathUtils.clamp(y + speed, bounds.minY, bounds.maxY);
        if (event.key === "ArrowDown")
          y = THREE.MathUtils.clamp(y - speed, bounds.minY, bounds.maxY);
        if (event.key === "ArrowLeft")
          x = THREE.MathUtils.clamp(x - speed, bounds.minX, bounds.maxX);
        if (event.key === "ArrowRight")
          x = THREE.MathUtils.clamp(x + speed, bounds.minX, bounds.maxX);

        return [x, y, z];
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bounds]);

  useFrame(() => {
    if (decalRef.current) {
      decalRef.current.position.set(...decalPosition);
    }
  });

  return (
    <group {...props} dispose={null}>
      <group>
        <group position={[0, -10, 0]} scale={[8, 8, 8]}>
          {[
            "Object_6",
            "Object_8",
            "Object_10",
            "Object_11",
            "Object_12",
            "Object_14",
            "Object_15",
            "Object_16",
          ].map((obj) => (
            <mesh
              key={obj}
              ref={tshirtMeshRef}
              geometry={nodes[obj].geometry}
              material={materials.Body_FRONT_2664}
            >
              <Decal
                ref={decalRef}
                position={decalPosition}
                scale={decalScale}
                map={texture}
                depthTest={false}
                depthWrite={true}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/t_shirt.glb");
