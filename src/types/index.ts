export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // multiplier against USD
  format: (amount: number) => string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'outerwear' | 'bottoms' | 'sweats' | 'accessories';
  categoryLabel: string;
  priceUSD: number;
  image: string;
  badge?: string;
  description: string;
  composition: string;
  fit: string;
  sizes: string[];
  stockCount: number;
  drop: string;
  specs: string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  description: string;
}
