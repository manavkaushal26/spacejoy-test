import { PricingData } from '@components/Pricing/PricingTypes';
import OrderSummary from '@components/Quiz/order-summary';
import PackageSelect from '@components/Quiz/package-select';
import Questions from '@components/Quiz/Questions';
import RoomSelect from '@components/Quiz/room-select';
import StartQuiz from '@components/Quiz/start-quiz';
import Layout from '@components/Shared/Layout';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/offerStore';
import { authUrl, company } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import { off, on } from '@utils/events';
import fetcher from '@utils/fetcher';
import { IndexPageMeta } from '@utils/meta';
import quizQuestions from '@utils/Mocks/quizQuestions';
import Cookies from 'js-cookie';
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { PushEvent } from '@utils/analyticsLogger';

const steps = ['start-quiz', 'room-select', 'select-package', 'order-summary', 'questions'];

const Index = ({ stepName, pricingData }): JSX.Element => {
  const { createRoom, getUserSelectionData, userRoomSelection, removeRoomWithoutPackage } = useStore(
    (store) => ({
      createRoom: store?.createRoom,
      getUserSelectionData: store?.getUserSelectionData,
      userRoomSelection: store?.userRoomSelection,
      removeRoomWithoutPackage: store?.removeRoomWithoutPackage,
    }),
    shallow
  );

  const router = useRouter();

  const getLayout = () => {
    switch (stepName) {
      case 'start-quiz': {
        return <StartQuiz />;
      }
      case 'room-select': {
        return <RoomSelect />;
      }
      case 'select-package': {
        return <PackageSelect data={pricingData} />;
      }
      case 'order-summary': {
        return <OrderSummary />;
      }
      case 'questions': {
        return <Questions />;
      }
    }
  };

  React.useEffect(() => {
    if (stepName !== 'select-package') {
      removeRoomWithoutPackage();
    }
  }, [stepName]);

  const currentStepIndex = steps.indexOf(stepName);

  const createSubScriptionCart = async () => {
    const isUserAuthenticated = Cookies.get('token') ? true : false;

    if (isUserAuthenticated) {
      const payload = getUserSelectionData();
      await fetcher({ endPoint: '/v1/subscriptionCarts', body: payload, method: 'POST' });
      router.push({ pathname: '/design-cart' });
    } else {
      window.open(`${authUrl}/signup?redirect=reload`, 'popup', 'width=1200,height=830');
    }
  };

  useEffect(() => {
    // listen to crossDocument message from an iframe
    //listen to message event

    const handleMessage = async () => {
      if (stepName === 'questions') {
        const maxQuizStep = Math.max.apply(
          null,
          Object.keys(quizQuestions).map((item) => parseInt(item, 10))
        );

        const stepIndex = parseInt(router?.query?.step as string, 10);

        if (stepIndex < maxQuizStep) {
          if (stepIndex === maxQuizStep - 1 && userRoomSelection?.length === 1) {
            await createSubScriptionCart();
          }
        } else {
          //create sub cart
          await createSubScriptionCart();
        }
      }
    };
    on('login:success', handleMessage);

    return () => {
      off('login:success', handleMessage);
    };
  }, [router]);

  return (
    <>
      <Layout>
        <Head>
          {IndexPageMeta}
          <title key="title">
            Interior Design Quiz - Help Us Understand Your Interior Design Needs | {company.product}
          </title>
          <meta
            key="description"
            name="description"
            content="Share your room details, budget, occasion and timeline details with us to help our interior designers design your dream home"
          />

          <meta
            key="og-title"
            property="og:title"
            content={`Interior Design Quiz - Help Us Understand Your Interior Design Needs | ${company.product}`}
          />
          <meta
            key="og-description"
            property="og:description"
            content="Share your room details, budget, occasion and timeline details with us to help our interior designers design your dream home"
          />
          <meta key="og-url" property="og:url" content={`https://www.spacejoy.com/quiz/start-quiz`} />
          <meta
            key="twitter-title"
            name="twitter:title"
            content={`Interior Design Quiz - Help Us Understand Your Interior Design Needs | ${company.product}`}
          />
          <meta
            key="twitter-description"
            name="twitter:description"
            content="Share your room details, budget, occasion and timeline details with us to help our interior designers design your dream home"
          />
        </Head>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <div className="container p-4 mx-auto min-h-screen">{getLayout()}</div>
        </Layout.Body>
        {currentStepIndex > 0 && (
          <footer className="flex sticky bottom-0 justify-between container p-4 md:py-8 mx-auto bg-white border-t border-gray-300 mt-4">
            {stepName !== 'order-summary' ? (
              <button
                className="flex items-center mr-auto text-lg md:text-2xl"
                onClick={() => {
                  PushEvent({
                    category: 'Quiz',
                    action: `Go Back from ${stepName}`,
                    label: "Go back"
                  })
                  router?.back();
                }}
              >
                <ChevronLeftIcon className="h-8 w-8 text-gray-900 bg-white" />
                <span>Back</span>{' '}
              </button>
            ) : null}

            {stepName === 'select-package' || (stepName === 'order-summary' && !userRoomSelection?.length) ? null : (
              <button
                className="py-3 px-5 rounded-md text-white bg-gray-900 ml-auto text-lg md:text-2xl"
                onClick={async () => {
                  if (stepName === 'start-quiz') {
                    PushEvent({
                      category: 'Quiz',
                      action: 'Quiz Begin - V2',
                      label: "Add room"
                    })
                  }
                  else if (stepName === 'room-select') {
                    // create room and go to package selection
                    await createRoom();
                    // get room without package
                    router?.push({ pathname: '/quiz/select-package' });
                  } else if (stepName === 'questions') {
                    const maxQuizStep = Math.max.apply(
                      null,
                      Object.keys(quizQuestions).map((item) => parseInt(item, 10))
                    );

                    const stepIndex = parseInt(router?.query?.step as string, 10);
                    if (stepIndex < maxQuizStep) {
                      if (stepIndex === maxQuizStep - 1 && userRoomSelection?.length === 1) {
                        await createSubScriptionCart();
                      } else {
                        const nextPath = stepIndex + 1;
                        router?.push({ pathname: '/quiz/questions', query: { step: nextPath } }, undefined, {
                          shallow: true,
                        });
                      }
                    } else {
                      //create sub cart
                      await createSubScriptionCart();
                    }
                  } else if (stepName === 'order-summary') {
                    router?.push({ pathname: '/quiz/questions', query: { step: 1 } });
                  }
                }}
              >
                Next
              </button>
            )}
          </footer>
        )}

        <Layout.Footer />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetcher({ endPoint: publicRoutes.pricingRoute, method: 'GET' });
  const {
    data: { list = [] },
  } = res;
  const pricingData: PricingData[] = list.map((item) => {
    return {
      features: item?.includedFeatures,
      excludedFeatures: item?.excludedFeatures,
      price: item?.price,
      salePrice: item?.salePrice,
      name: item?.slug,
      description: item?.description,
      savings: item?.savings,
      tags: item?.tags,
      slug: item?.slug,
      id: item?._id,
    };
  });

  return {
    props: {
      stepName: params?.stepNumber,
      revalidate: 1,
      pricingData,
    },
  };
};

export default Index;
