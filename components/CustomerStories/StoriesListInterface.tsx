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

export interface StoryData {
  meta: Meta;
  afterImage: AfterImage;
  title: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  _id: string;
  slug: string;
}

export interface StoriesList {
  data: StoryData[];
  count: number;
}

export interface StoriesResponse {
  status: string;
  statusCode: number;
  data: StoriesList;
  context: string;
  message?: any;
  group?: any;
}
