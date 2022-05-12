import { exploreIdeasCat, hireADesignerCat, splitCategories } from '@utils/Mocks/SplitCategoriesData';

export const menuData = [
  {
    name: 'Design Your Space',
    title: 'Designs',
    categories: hireADesignerCat,
    active: true,
  },
  {
    name: 'Shop Sets',
    url: '/room-select',
    active: true,
  },
  {
    name: 'Shop',
    url: '/shop-furniture-decor',
    active: true,
  },
  {
    name: 'Explore Ideas',
    title: 'Ideas',
    categories: exploreIdeasCat,
    active: true,
  },
];

export const navDataCategories = [
  {
    name: 'Shop',
    title: 'Category',
    categories: splitCategories,
    active: false,
  },
];
