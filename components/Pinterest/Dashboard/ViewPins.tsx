import fetcher from '@utils/fetcher';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MasonryItem, StyledImage } from '../Search/PinterestBoardsList';

interface ViewPins {
  boardId: string;
  token: string;
}

const ViewPins: React.FC<ViewPins> = ({ boardId, token }) => {
  const [loading, setLoading] = useState(false);
  // const [bookmark, setBookmark] = useState("");

  const [pinList, setPinList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getUserBoards = async () => {
      setLoading(true);
      const data = await fetcher({
        endPoint: `/api/pinterest/get_pins/${token}?boardId=${boardId}&pageSize=100`,
        hasBaseUrl: true,
        method: 'GET',
      });

      if (data?.statusCode <= 200) {
        setPinList(data?.data?.items);
        // TODO: handle pinterest pagination
        // setBookmark(data?.bookmark);
      }
      setLoading(false);
    };
    if (token) getUserBoards();
  }, [token, boardId]);

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 4 }}>
        <Masonry gutter="20px">
          {pinList?.map((imgItem, index) => (
            <Link
              key={imgItem?.id}
              href={`/pinterest/find-products?imgSrc=${imgItem.media?.images?.['600x']?.url}&boardId=${boardId}`}
            >
              <a>
                <MasonryItem delay={index} className="masonry-item shine" key={imgItem.id}>
                  <StyledImage width="100%" src={imgItem.media?.images?.['600x']?.url} />
                  <div className="overlay">
                    <span>Find similar products</span>
                  </div>
                </MasonryItem>
              </a>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ViewPins;
