export interface Image {
  imgType: string;
  _id: string;
  img: string;
  cdn: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
}

export interface Author {
  profile: Profile;
  _id: string;
  id: string;
}

export interface BlogData {
  metaTitle: string;
  metaDescription: string;
  blogType: string;
  tags: string[];
  backlinks: any[];
  status: string;
  renderBody: string[];
  _id: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  coverImg: string;
  coverImgCdn: string;
  socialImgCdn: string;
  image360Cdn: string;
  images: Image[];
  category: Category;
  body: string;
  publishDate?: any;
  author: Author;
  createdAt: Date;
  updatedAt: any;
  __v: number;
}

export interface Blog {
  status: string;
  statusCode: number;
  data: BlogData;
  context: string;
  message: string;
  group: string;
  stack: boolean;
}
