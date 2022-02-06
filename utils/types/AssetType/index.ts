import ImageType from './ImageType';
import Status from './StatusEnum';

export interface MetaDetailedType {
  _id: string;
  name: string;
}

interface AssetType {
  vertical?: string;
  msrp?: number;
  displayPrice?: string;
  name: string;
  price: number;
  description: string;
  // retailer: {
  //   _id: string;
  //   name: string;
  // };
  retailer?: string;
  renderImages: [
    {
      _id: string;
      cdn: string;
      fileUrl: string;
      imageType: string;
    }
  ];
  productImages: ImageType[];
  status: Status;
  inStock: boolean;
  shoppable: boolean;
  spatialData: {
    fileUrls?: {
      source: string;
      glb: string;
      legacy_obj: string;
      sourceHighPoly: string;
    };
  };
  scraper?: { availabilityScore?: number };
  available: boolean;
  width: number;
  height: number;
  depth: number;
  dimension: {
    depth: number;
    width: number;
    height: number;
  };
  meta: {
    category: string | MetaDetailedType;
    subcategory: string | MetaDetailedType;
    vertical: string | MetaDetailedType;
    theme: string | MetaDetailedType;
  };
  retailLink: string | {
    _id: string;
    name: string;
  };
  cdn: string;
  _id: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  // E-COMMERCE
  assemblyInfo?: string;
  warrantyInfo?: string;
  shippingPolicy?: string;
  cancellationPolicy?: string;
  refundPolicy?: string;
  returnPolicy?: string;
  estimatedArrival?: string;
  estimatedDispatch?: string;
  countryOfOrigin?: string;
  sku?: string;
  stockQty?: number;
  flatShipping?: number;
}

export default AssetType;
