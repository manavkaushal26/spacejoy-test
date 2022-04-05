import React from "react";



const PulseDot = () => <div className="inline-block relative -top-2 h-[6px] w-[6px] rounded-md bg-[#F5296E]"><div className="animate-pulseDot  bg-[#F39C12] rounded-lg h-2 w-2 -top-1 before:content-none before:absolute before:bg-[#F39C12] before:-top-2 before:-left-2 before:h-5 before:w-5 before:rounded-md before:opacity-100 before:animate-ping before:scale-50 " /></div>;

export default React.memo(PulseDot);
