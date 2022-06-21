import { useStore } from '@lib/offerStore';
import { company } from '@utils/config';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import shallow from 'zustand/shallow';

const Index = () => {
  const router = useRouter();
  const { query: { step = '1' } = {} } = router;
  const { questions, updateQuizSelection } = useStore(
    (store) => ({
      updateQuizSelection: store?.updateQuizSelection,
      questions: store?.questions,
    }),
    shallow
  );
  const { question = {}, answers = [], helper } = questions[step as string] || {};

  return (
    <>
      <Head>
        <title key="title">Select Your Goal | {company.product}</title>
        <meta
          key="description"
          name="description"
          content="Select your goal for this project. Starting from scratch, know what you need, or need help just with décor? Your goal will help us understand your needs better."
        />
      </Head>
      <div className="-mx-4">
        <div className="p-12 rounded-lg bg-[#FFF8F5]">
          <h2 className="mb-3 homepage-section_headings font-normal">
            <span className="text-[#EE2F70]">{question?.prefix}</span>

            <span>&nbsp;{question?.suffix}</span>
          </h2>
          <p className="mt-4">{helper}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mt-8">
        <div className="col-span-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {answers?.map((item, index) => {
            return (
              <div
                className={`p-4 rounded-lg bg-white border border-gray-300 grid grid-cols-6 cursor-pointer min-h-[250px] ${
                  item?.selected ? 'bg-[#FFF8F5] border-[#FFF8F5] shadow-sm' : 'bg-white border-gray-300 '
                } `}
                key={item?.id}
                onClick={() => updateQuizSelection(step, item?.id)}
              >
                <div className="col-span-1 pt-2 pl-2">
                  <input
                    type="radio"
                    // name="room"
                    checked={item?.selected}
                    className={`w-5 h-5 text-gray-900  cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white `}
                    readOnly
                  />
                </div>

                <div className="flex flex-col items-center justify-center col-span-4">
                  {item?.icon ? (
                    <div className="flex mb-4 h-16 w-16 relative mb-4">
                      <Image src={item?.icon} layout="fill" objectFit="contain" alt={item.answer} />
                    </div>
                  ) : null}
                  <label className="cursor-pointer  text-center text-lg md:text-xl">{item?.answer}</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
