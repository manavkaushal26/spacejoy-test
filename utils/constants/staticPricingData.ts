type Feature = {
  _id: string;
  label: string;
  helpText?: string;
};

type Price = {
  label: string;
  value: number;
};

type Savings = {
  label: string;
  inAmount: number;
  inPercent: number;
};

export type PricingDataType = {
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
};

export const staticPricingData: PricingDataType[] = [
  {
    features: [
      {
        _id: '62da325e6e7c4700358bf32d',
        label: 'Get <b>$250 instantly in shopping credits</b> to bring your design to life.',
        helpText: '',
      },
      {
        _id: '65f89d294706a4000d60ead7',
        label: '<b>$49 goes towards designing a room</b> tailored to your style.',
      },
      {
        _id: '664d1affa039d6000d5df47c',
        label: 'Enjoy <b>1 fully designed room</b> and up to 2 design revisions.',
        helpText: 'Revision request must be submitted within 30 days of receiving your design',
      },
      {
        _id: '63bdf1da411d7a0018b7de53',
        label: 'Design delivered within <b>10 business days</b>.',
        helpText: 'Timeline starts when all info is submitted',
      },
      {
        _id: '63bdf1da411d7a0018b7de54',
        label: '<b>Collaborate 1:1</b> with our lead designer.',
        helpText: 'These designers have 5+ years of design experience and a design degree',
      },
      {
        _id: '63bdf1da411d7a0018b7de55',
        label: '<b>In-house shopping support</b> included.',
        helpText: '',
      },
    ],
    excludedFeatures: [],
    price: {
      label: 'Original Price',
      value: 499,
    },
    salePrice: {
      label: 'Deal Price',
      value: 299,
    },
    name: 'delight',
    saleDescription: 'Get <b>$250</b> shopping credits',
    summary: 'Receive a <b>custom room design</b> from our designer.',
    description: 'To get you started',
    savings: {
      label: 'You Save',
      inAmount: 200,
      inPercent: 40,
    },
    tags: [],
    slug: 'delight',
  },
  {
    features: [
      {
        _id: '63bdf2531e48eb001804b497',
        label: 'Get <b>$300 instantly in shopping credits</b> to bring your design to life.',
        helpText: '',
      },
      {
        _id: '65f89cff4706a4000d60e717',
        label: '<b>$99 goes towards designing a room</b> tailored to your style.',
      },
      {
        _id: '664d1ac3a039d6000d5df2c4',
        label: 'Enjoy <b>1 fully designed room</b>. Choose from 2 design concepts.',
      },
      {
        _id: '63be17443b0b7a001841a24b',
        label: 'Up to 2 design revisions.',
        helpText: 'Revision request must be submitted within 30 days of receiving your design.',
      },
      {
        _id: '63bdf9076025c8001870d63c',
        label: 'Design delivered within <b>10 business days</b>.',
        helpText: 'Timeline starts when all info is submitted',
      },
      {
        _id: '63bdf3aa1e48eb001804ccab',
        label: '<b>Collaborate 1:1</b> with our senior designer.',
        helpText: 'These designers have 5+ years of design experience and a design degree',
      },
      {
        _id: '63bdf3aa1e48eb001804ccac',
        label: '<b>In-house shopping support</b> included.',
        helpText: '',
      },
    ],
    excludedFeatures: [],
    price: {
      label: 'Original Price',
      value: 699,
    },
    salePrice: {
      label: 'Deal Price',
      value: 399,
    },
    name: 'bliss',
    saleDescription: 'Get <b>$300</b> shopping credits',
    description: 'Right one for most',
    summary: 'Receive <b>2 custom room designs</b> from our senior designer, choose your favorite.',
    savings: {
      label: 'You Save',
      inAmount: 300,
      inPercent: 43,
    },
    tags: ['recommended'],
    slug: 'bliss',
  },
  {
    features: [
      {
        _id: '62eb7cc5a15d7f001cf09542',
        label: 'Get <b>$400 instantly in shopping credits</b> to bring your design to life.',
        helpText: '',
      },
      {
        _id: '65f89cbe4706a4000d60e177',
        label: '<b>$199 goes towards designing a room</b> tailored to your style.',
      },
      {
        _id: '664d1a84a039d6000d5df04a',
        label: 'Enjoy <b>1 fully designed room</b>. Choose from 2 design concepts.',
      },
      {
        _id: '66044cf12f13ef000da85775',
        label: 'Up to 4 live design revisions with your designers.',
        helpText: 'Up to 20 minutes of screen share time scheduled with your designer per revision',
      },
      {
        _id: '63bdf8de6025c8001870d2a7',
        label: 'Design delivered within <b>7 business days</b>.',
        helpText: 'For renovation projects, this timeline may be extended',
      },
      {
        _id: '63bdf6e71e48eb00180504c7',
        label: '<b>Collaborate 1:1</b> with our director of design.',
        helpText: 'These designers have 7+ years of design experience and a design degree',
      },
      {
        _id: '63bdf6e71e48eb00180504c8',
        label: '<b>In-house shopping support</b> included.',
      },
    ],
    excludedFeatures: [],
    price: {
      label: 'Original Price',
      value: 999,
    },
    salePrice: {
      label: 'Deal Price',
      value: 599,
    },
    name: 'euphoria',
    saleDescription: 'Get <b>$400</b> shopping credits',
    description: 'If you love a good deal',
    summary: 'Receive <b>2 custom room designs</b> with <b>live edits</b> from our design director.',
    savings: {
      label: 'You Save',
      inAmount: 400,
      inPercent: 40,
    },
    tags: [],
    slug: 'euphoria',
  },
];
