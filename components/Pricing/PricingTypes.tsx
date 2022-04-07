export interface Feature {
  _id: string;
  label: string;
  helpText?: string;
}
export interface Price {
  value: number;
  label: string;
}

export interface Savings {
  label: string;
  inPercent: number;
  inAmount: number;
}
export interface PricingData {
  features: Array<Feature>;
  excludedFeatures: Array<Feature>;
  price: Price;
  salePrice: Price,
  name: string;
  description: string;
  savings: Savings;
  tags: any[];
  slug: string;
}