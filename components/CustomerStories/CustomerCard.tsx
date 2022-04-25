import { cloudinary } from '@utils/config';
import Image from 'next/image';

export default function CustomerCard({ name, description, subText, avatar }) {
  return (
    <div className="flex bg-[#f8f8f8] shadow-md rounded-md p-5">
      <div className="mr-4 flex-shrink-0">
        <div className="relative col-span-2 rounded-full ring-2 ring-white bg-[#F39C12] h-16 w-16 -mb-1 border-1 border-white overflow-hidden">
          <Image src={`${cloudinary.baseDeliveryURL}/c_fill,g_faces,h_200,w_200/${avatar}`} alt="" layout="fill" />
        </div>
      </div>
      <div>
        <small className="text-xs">{subText} -</small>
        <h2 className="text-xl sm:text-2xl">{name}</h2>
        <p className=" mt-5 text-xs sm:text-sm">{description}</p>
      </div>
    </div>
  );
}
