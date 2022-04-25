export interface Meta {
  roomType: string;
  budget: string;
  package: string;
}

export interface AfterImage {
  _id: string;
  cdn: string;
  path: string;
  imgType: string;
}

export interface CustomerData {
  meta: Meta;
  afterImage: AfterImage;
  title: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  _id: string;
  slug: string;
}

export interface Theme {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  roomType: string;
  id: string;
  slug: string;
}

export interface SimilarPicksData {
  _id: string;
  name: string;
  cdnRender: string[];
  theme: Theme;
  room: Room;
  slug: string;
}

export interface Theme2 {
  _id: string;
  name: string;
}

export interface Room2 {
  _id: string;
  roomType: string;
  id: string;
  slug: string;
}

export interface CategoryData {
  _id: string;
  name: string;
  cdnRender: string[];
  theme: Theme2;
  room: Room2;
  slug: string;
}

export interface Theme3 {
  _id: string;
  name: string;
}

export interface Room3 {
  _id: string;
  roomType: string;
  id: string;
  slug: string;
}

export interface EditorPickData {
  _id: string;
  name: string;
  cdnRender: string[];
  theme: Theme3;
  room: Room3;
  slug: string;
}

export interface EngagementBlockInterface {
  customerData: CustomerData[];
  similarPicksData: SimilarPicksData[];
  categoryData: CategoryData[];
  editorPickData: EditorPickData[];
}