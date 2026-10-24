import { CartItem, Currency, CurrencyConfig } from '../types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (amount) => `$${Math.round(amount).toLocaleString()}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    format: (amount) => `€${Math.round(amount).toLocaleString()}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    format: (amount) => `£${Math.round(amount).toLocaleString()}`,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    rate: 155.0,
    format: (amount) => `¥${Math.round(amount).toLocaleString()}`,
  },
};

export const DISCOUNT_CODES: Record<string, number> = {
  DROP01: 10, // 10% off
  ARCHIVE20: 20, // 20% off
  VIPPASS: 15, // 15% off
};

export const FREE_SHIPPING_THRESHOLD_USD = 250;
export const STANDARD_SHIPPING_USD = 25;

export function convertPrice(amountInUSD: number, currency: Currency): number {
  const rate = CURRENCIES[currency]?.rate || 1.0;
  return amountInUSD * rate;
}

export function formatPrice(amountInUSD: number, currency: Currency): string {
  const converted = convertPrice(amountInUSD, currency);
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  return config.format(converted);
}

export function calculateSubtotalUSD(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
}

export function calculateDiscountUSD(
  subtotalUSD: number,
  promoCode: string
): { discountAmount: number; isValid: boolean; percentage: number; message: string } {
  const cleanCode = promoCode.trim().toUpperCase();
  if (!cleanCode) {
    return { discountAmount: 0, isValid: false, percentage: 0, message: '' };
  }

  const percentage = DISCOUNT_CODES[cleanCode];
  if (percentage) {
    const discountAmount = (subtotalUSD * percentage) / 100;
    return {
      discountAmount,
      isValid: true,
      percentage,
      message: `Code ${cleanCode} applied: ${percentage}% OFF`,
    };
  }

  return {
    discountAmount: 0,
    isValid: false,
    percentage: 0,
    message: 'Invalid promo code. Try DROP01',
  };
}

export function calculateShippingUSD(subtotalUSD: number): number {
  if (subtotalUSD === 0) return 0;
  return subtotalUSD >= FREE_SHIPPING_THRESHOLD_USD ? 0 : STANDARD_SHIPPING_USD;
}

export function calculateTotalUSD(
  subtotalUSD: number,
  discountUSD: number,
  shippingUSD: number
): number {
  return Math.max(0, subtotalUSD - discountUSD + shippingUSD);
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
