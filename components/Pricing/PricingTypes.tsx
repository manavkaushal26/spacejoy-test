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
  features: Feature[];
  excludedFeatures: Feature[];
  price: Price;
  salePrice: Price;
  name: string;
  saleDescription?: string;
  description: string;
  savings: Savings;
  tags: string[];
  slug: string;
  summary: string;
}
