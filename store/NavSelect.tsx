import React, { useState } from 'react';
const NavSelectContext = React.createContext([]);

// const getCategory = (nav) => {
//   switch (nav) {
//     case 'collages':
//       return 'Left Menu - View New Design Sets';
//     case 'store':
//       return 'Left Menu - View Products List';
//     case 'shop':
//       return 'Left Menu - View Shopping List';
//     case 'recommendations':
//       return 'Left Menu - View Swapper';
//     default:
//       return '';
//   }
// };
// const getAction = (nav) => {
//   switch (nav) {
//     case 'collages':
//       return 'View New Design Sets';
//     case 'store':
//       return 'View Products List';
//     case 'shop':
//       return 'View Shopping List';
//     case 'recommendations':
//       return 'View Swapper';
//     default:
//       return '';
//   }
// };

const NavSelectContextProvider: React.FC = ({ children }) => {
  const [nav, setNav] = useState<string>('');

  // useEffect(() => {
  //   const category = getCategory(nav);
  //   const action = getAction(nav);
  //   // PushEvent({
  //   //   category,
  //   //   action,
  //   //   label: 'Explore Design Set',
  //   // });
  // }, [nav]);

  return <NavSelectContext.Provider value={[nav, setNav]}>{children}</NavSelectContext.Provider>;
};

export { NavSelectContext, NavSelectContextProvider };
