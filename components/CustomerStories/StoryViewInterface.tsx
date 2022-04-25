export interface CustomerAddress {
  country: string;
  state?:string;
}

export interface AfterImage {
  _id: string;
  cdn: string;
  path: string;
  imgType: string;
}

export interface About {
  customerAddress: CustomerAddress;
  title: string;
  afterImages: AfterImage[];
  customerId: string;
  customerAvatar: string;
  customerName: string;
  designerId: string;
  designerName: string;
  designerAbout: string;
  designerAvatar: string;
  projectDescription: string;
}

export interface Asset {
  tags: string[];
  price: number;
  currency: string;
  retailer: string;
  shoppable: boolean;
  _id: string;
  name: string;
  retailLink: string;
  imageUrl: string;
  cdn: string;
}

export interface AssetList {
  asset: Asset;
  _id: string;
  billable: boolean;
}

export interface Summary {
  assetList: AssetList[];
  testimonial: string;
  rating: number;
}

export interface Meta {
  roomType: string;
  budget: string;
  package: string;
  designerNote: string;
  feedback?: string;
}

export interface Image {
  _id: string;
  cdn: string;
  path?: any;
  imgType: string;
}

export interface Timeline {
  meta: Meta;
  _id: string;
  images: Image[];
  section: string;
  title: string;
  description: string;
  sequence: number;
}

export interface StoryData {
  about: About;
  summary: Summary;
  isPublished: boolean;
  _id: string;
  projectId: string;
  designId: string;
  timeline: Timeline[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  slug: string;
}

export interface StoryViewResponse {
  status: string;
  statusCode: number;
  data: StoryData;
  context: string;
  message?: any;
  group?: any;
}