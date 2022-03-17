import React, { useState } from 'react';

const CollapsibleList = ({ list, children }) => {
  const [expanded, setExpanded] = useState(false);
  const listForDisplay = expanded ? list : list.slice(0, 5);

  return (
    <>
      <div>{listForDisplay.map((child, idx)=>{
        return children;
      })}</div>
      <div className="my-3 text-sm text-[#F5296E] capitalize cursor-pointer">
        <button type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : `+${list.length - 5} More`}
        </button>
      </div>
    </>
  );
};

export default CollapsibleList;
