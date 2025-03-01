// "use client";
// import TshirtModel from "@/components/TshirtModel";
// import { Environment, OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import React from "react";

// const page = () => {
//   return (
//     <div className="max-container padding-container">
//       <div className=" w-[500px] h-[600px] bg-black ">
//         <Canvas>
//           <Environment preset="studio" />
//           <OrbitControls />
//           <TshirtModel imageUrl={"/Tee.png"} />
//         </Canvas>
//       </div>
//     </div>
//   );
// };

// export default page;

import Playground from "@/components/Playground";
import React from "react";

const page = () => {
  return (
    <div>
      <Playground />
    </div>
  );
};

export default page;
