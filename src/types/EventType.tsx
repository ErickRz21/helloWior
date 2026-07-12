type PriceRange = {
  type?: string; // Make the type property optional
  min: number;
  max: number;
  currency: string;
};

export type EventType = {
  classifications: any;
  url?: string;
  priceRanges?: PriceRange[]; // Make priceRanges optional
  id: string;
  name: string;
  dates: { start: { localDate: string; localTime?: string } };
  _embedded?: {
    venues: {
      locale?: { name: string }[];
      name: string;
    }[];
  };
  images?: {
    url: string;
    width?: number;
    height?: number;
    ratio?: string;
    fallback?: boolean;
  }[];
};
