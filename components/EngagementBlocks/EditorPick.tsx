import { blurredBgImage } from "@public/images/bg-base-64";
import RecommendedIcon from "@public/images/recommended.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const correctedSlug = (slug:string) => {
  return slug?.split(' ').join('-');
}

const EditorPickCard = ({ data }) => {

  return (
    <Link href={`/interior-designs/${correctedSlug(data.room.slug)}/${data?.slug}`}
    as={`/interior-designs/${correctedSlug(data?.room?.slug)}/${data?.slug}`}>
      <a >
        <div className="cursor-pointer mt-8">
          <div className=" rounded overflow-hidden relative border border-gray-200 transition group-hover:shadow-md">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image
              className="object-cover transition duration-700 filter transform group-hover:brightness-110 hover:brightness-110 hover:scale-105"
              alt={data?.name}
              src={`https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1000,h_600/${data?.cdnRender[0]}`}
              height="300"
              width="500"
              layout="responsive"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
            <div className="absolute rounded-full ring-2 ring-white bg-[#F39C12] h-14 w-14 top-5 right-5 -mb-1 border-1 border-white overflow-hidden">
              <Image
                src={RecommendedIcon}
                alt={`${data.customerName}`}
                layout="fill"
              />
            </div>
          </div>
          <div className="flex items-center py-4 bg-white px-4">
            <div className="flex-1 mr-2">
              <p className="text-gray-500 text-xs capitalize">{data?.room?.roomType}</p>
              <p className="text-gray-800 mt-1 transition hover:text-red-500">{data?.name}</p>
            </div>
            
          </div>
        </div>
      </a>
    </Link>
  )
}

const EditorPick = ({ data }) => {
	return (
		<>
			{data.map((item) => {
				return (
					item?.room && (
						<EditorPickCard data={item} key={item?._id}/>
					)
				);
			})}
		</>
	);
};


export default React.memo(EditorPick);
