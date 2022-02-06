import { AssetType } from "@components/Collection/AssetType";

export interface AssetInterface {
  asset: AssetType
}

export interface DesignViewInterface {
  design: {
    _id: string;
    name: string;
    longDescription: string;
    metaDescription: string;
    description: string;
    metaTitle: string;
    altTag: string;
    slug: string;
    designCostEstimate: number;
    cdnRender: Array<string>;
    assets: Array<AssetInterface>;
    tags: Array<string>;
    room: {
      roomType: string;
      slug: string;
      _id: string;
    };
    publishedDate: string;
  };
}
