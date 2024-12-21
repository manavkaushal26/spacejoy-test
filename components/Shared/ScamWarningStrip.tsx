import React, { useEffect, useState } from "react";

const ScamWarningStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const warningClosed = localStorage.getItem("scamWarningClosed");
    if (!warningClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = (): void => {
    setIsVisible(false);
    localStorage.setItem("scamWarningClosed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-red-700 text-white py-3 px-5 flex flex-col sm:flex-row justify-between items-start sm:items-center z-50 shadow-lg">
      <div className="text-sm">
        <p className="font-bold">Important Notice: Beware of Scams</p>
        <p className="mt-2">
          It has come to our attention that a fraudulent company is using the{" "}
          <span className="font-semibold">Spacejoy</span> name and logo to solicit money under the pretense of job offers. Please be advised that{" "}
          <span className="font-semibold">Spacejoy</span> does not ask for payments from job applicants.
        </p>
        <p className="mt-2">
          If you encounter such a scam, report it immediately to us at{" "}
          <a
            href="mailto:hello@spacejoy.com"
            className="underline hover:text-gray-200"
          >
            hello@spacejoy.com
          </a>
          . We are actively collecting evidence to pursue legal action against these scammers. Stay vigilant and verify all communication directly with us.
        </p>
        <p className="mt-2 text-xs">
          Fraud Domains:{" "}
          {/* <a
            href="https://www.spacejoyagency.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-200"
          > */}
            https://www.spacejoyagency.co/ , www.spacejoystyle.com
          {/* </a> */}
        </p>
      </div>
      <button
        onClick={handleClose}
        className="mt-3 sm:mt-0 text-lg text-white hover:text-gray-300 focus:outline-none self-end sm:self-center"
        aria-label="Close Scam Warning"
      >
        ✖
      </button>
    </div>
  );
};

export default ScamWarningStrip;
