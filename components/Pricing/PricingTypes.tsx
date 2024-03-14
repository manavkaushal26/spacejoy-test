export interface PricingData {
  _id: string;
  revisionMeta: RevisionMeta;
  tags: string[];
  isSaleActive: boolean;
  status: string;
  designs: number;
  versionNumber: number;
  mrp: Mrp;
  price: Price;
  salePrice: SalePrice;
  savings: Savings;
  name: string;
  description: string;
  turnAroundTime: number;
  includedFeatures: IncludedFeature[];
  excludedFeatures: any[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  country: string;
}

export interface RevisionMeta {
  maxRevisionsAllowed: number;
  minRevisionTat: number;
  maxRevisionTat: number;
  maxProductRequestsAllowed: number;
}

export interface Mrp {
  label: string;
  value: number;
}

export interface Price {
  label: string;
  value: number;
}

export interface SalePrice {
  label: string;
  value: number;
}

export interface Savings {
  label: string;
  inAmount: number;
  inPercent: number;
}

export interface IncludedFeature {
  _id: string;
  label: string;
  helpText: string;
}
