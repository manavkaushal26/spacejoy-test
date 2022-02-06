import ViewPins from '@components/Pinterest/Dashboard/ViewPins';
import Layout from '@components/Shared/Layout';
import fetcher from '@utils/fetcher';
import { reactLocalStorage } from '@utils/helpers';
import { GetServerSideProps, NextPage } from 'next';
import cookies from 'next-cookies';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetUserResponse } from 'pages/api/pinterest/get_user/[accessCode]';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

interface DashboardProps {
  token: string;
  refreshToken: string;
  boardId: string;
}

const Dashboard: NextPage<DashboardProps> = ({ token, refreshToken, boardId }) => {
  const router = useRouter();
  const [user, setUser] = useState<Partial<GetUserResponse>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boards, setBoards] = useState([]);
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await reactLocalStorage.getObject('pinterest_user');
      if (user) {
        setUser(user);
      } else {
        router.push('/pinterest/oauth');
      }
    };
    if (token) {
      fetchUser();
    } else {
      if (refreshToken) {
        router.push('/pinterest/oauth');
      } else {
        router.push('/pinterest/search');
      }
    }
  }, [token, refreshToken]);

  const fetchBoards = async () => {
    if (loading || (!bookmark && boards?.length > 0)) return;
    setLoading(true);
    const data = await fetcher({
      endPoint: `/api/pinterest/get_boards/${token}?page_size=100${bookmark ? `&bookmark=${bookmark}` : ''}`,
      hasBaseUrl: true,
      method: 'GET',
    });
    if (data?.statusCode !== 200) {
      setError(true);
      setLoading(false);
    } else {
      setBoards([...boards, ...data.data?.items]);
      setBookmark(data.data?.bookmark);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (!boardId) {
      router.push({ pathname: '/pinterest/dashboard', query: { boardId: boards[0]?.id } });
    }
  }, [boards]);

  return (
    <Layout>
      <Head>
        <title>Pinterest dashboard | Spacejoy</title>
      </Head>
      <Layout.Header />

      <Layout.Body>
        <div className="bg-gray-100 pt-4 pb-16">
          <div className="container flex mx-auto divide-x ">
            <div className="w-1/4 divide-y  ">
              <div className="sticky top-24">
                {user?.username && (
                  <div className="divide-y shadow-sm bg-white">
                    <div className="flex items-center p-4">
                      {/* profile avatar in tailwind using nextjs image*/}

                      <div className="flex-shrink-0 relative h-12 w-12 rounded-full overflow-hidden shadow-lg mr-4">
                        <Image src={user?.profile_image || ''} alt="avatar" layout="fill" />
                      </div>
                      <div>
                        <span className="font-bold capitalize">{user.username}</span>
                      </div>
                    </div>
                    <div className="p-4 text-center text-sm">Select a board to view pins</div>
                  </div>
                )}
                <div className="divide-y ">
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={fetchBoards}
                    hasMore={!!bookmark}
                    classID="divide-y"
                    className="divide-y"
                    loader={
                      <div className="p-4 bg-white">
                        <div className="animate-pulse h-4 mb-2 bg-gray-300 w-1/2" />
                        <div className="animate-pulse h-4 mb-2 bg-gray-300" />
                        <div className="animate-pulse h-4 bg-gray-300 w-3/4" />
                      </div>
                    }
                  >
                    {boards?.map((board) => (
                      <Link href={`/pinterest/dashboard?boardId=${board?.id}`} key={board?.id}>
                        <a className={`block p-4 bg-white hover:bg-blue-100`}>
                          <div>
                            <h4 className="text-capitalize text-ellipsis line-clamp-1 font-bold mb-1 capitalize text-black/80">
                              {board?.name}
                            </h4>
                            <p className="line-clamp-2 text-gray-500 text-sm">
                              {board?.description || 'No Description'}
                            </p>
                          </div>
                        </a>
                      </Link>
                    ))}
                    {loading && (
                      <div className="p-4 bg-white">
                        <div className="animate-pulse h-4 mb-2 bg-gray-300 w-1/2" />
                        <div className="animate-pulse h-4 mb-2 bg-gray-300" />
                        <div className="animate-pulse h-4 bg-gray-300 w-3/4" />
                      </div>
                    )}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
            <div className=" w-3/4 bg-white p-4 sticky top-24">
              <div className="sticky top-24 ">
                <ViewPins boardId={boardId} token={token} />
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (ctx) => {
  const cookie = cookies(ctx);
  const { pinterest_access_token, pinterest_refresh_token } = cookie;
  const { boardId } = ctx?.query;

  return {
    props: {
      token: pinterest_access_token,
      refreshToken: pinterest_refresh_token,
      boardId: (boardId as string) || '',
    },
  };
};

export default Dashboard;
