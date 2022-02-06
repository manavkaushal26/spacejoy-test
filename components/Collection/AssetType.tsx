interface ImageType {
  _id: string;
  fileUrl: string;
  cdn: string;
  imageType: string;
}

interface MetaType {
  _id: string;
  name: string;
}

export interface AssetType {
  _id: string;
  meta: {
    category: MetaType;
    subcategory: MetaType;
    vertical: MetaType;
  };
  price: number;
  retailer: {
    _id: string;
    name: string;
  };
  name: string;
  dimension: {
    height: number;
    width: number;
    depth: number;
  };
  renderImages: ImageType[];
  cdn: string;
  imageUrl: string;
  msrp: number;
  displayPrice: number;
  recommendedQuantity: number;
}
