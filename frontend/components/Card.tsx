// import React from 'react'
// import cardList from '../constants/data'
// import Button from './Button'

// function Card() {
//   return (
//     <div className="container mx-auto">
//       <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
//         {cardList.map( card => (
//           <div className="shadow-lg rounded-lg">
//             <img className="rounded-t-lg" src={card.img} alt="" />
//             <div className="p-5">
//               <h3 className="text-3xl font-bold text-slate-700 mb-3">{card.title}'s</h3>
//               <p className="text-lg font-normal text-gray-600">{card.text}</p>
//               <div className="flexBetween gap-2">
//                 <Button 
//                   type="button"
//                   title="Cart"
//                   variant="btn_white_text"
//                 />
//                 <Button 
//                   type="button"
//                   title="Shop"
//                   variant="btn_dark_green"
//                  />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//     </div>
//   )
// }

// export default Card

// Card.js



'use client'
import { useRouter } from 'next/navigation'
import Button from './Button';

function Card({ img, title, text, id }) {
  const router = useRouter();

  return (
    <div className="shadow-lg rounded-lg" >
      <img 
        className="rounded-t-lg cursor-pointer" 
        src={img} 
        alt={title} 
        onClick={() => router.push(`/product/${id}`)}
      />
      <div className="p-5">
        <h3 className="text-3xl font-bold text-slate-700 mb-3">{title}</h3>
        <p className="text-lg font-normal text-gray-600">{text}</p>
        <div className="flexBetween gap-2">
          <Button 
            type="button"
            title="Cart"
            variant="btn_white_text"
          />
          <Button 
            type="button"
            title="Shop"
            variant="btn_dark_green"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
