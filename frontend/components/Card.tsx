'use client'
import { useRouter } from 'next/navigation'

interface CardProps {
  img: string;
  title: string;
  price: number;
  id: string;
}

function Card({ img, title, price, id }: CardProps) {
  const router = useRouter();

  const openInNewTab = () => {
    window.open(`/product/${id}`, '_blank');
  };

  return (
    <div className="rounded-lg min-w-[200px] sm:min-w-[230px] md:min-w-[250px] lg:min-w-[300px]" >
      <div className='overflow-hidden rounded-lg'>
        <img 
        className="h-auto w-full rounded-lg cursor-pointer transition-all duration-500 hover:scale-125" 
        src={img} 
        alt={title} 
        onClick={openInNewTab}
      />
      </div>
      
      <div className="py-4 px-4">
        <h3 className="text-3xl font-bold text-slate-700 mb-3">{title}</h3>
        <p className="text-lg font-normal text-gray-600">Rs {price}</p>
      </div>
    </div>
  );
}

export default Card;

