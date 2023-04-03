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
    count: Number,
    list: BlogCardInterface[]
}

export interface BlogCardInterface {
  tags: string[];
  status: string;
  _id: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  coverImgCdn: string;
  category: Category;
  publishDate?: any;
  author: Author;
  createdAt: Date;
}

export interface BlogListInterface {
  status?: string;
  statusCode?: number;
  data: BlogData;
  context?: string;
  message?: string;
  group?: string;
  stack?: boolean;
}
