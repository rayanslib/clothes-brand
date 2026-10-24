import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotalUSD,
  calculateDiscountUSD,
  calculateShippingUSD,
  calculateTotalUSD,
  convertPrice,
  formatPrice,
  validateEmail,
  FREE_SHIPPING_THRESHOLD_USD,
} from './cart';
import { CartItem, Product } from '../types';

const mockProductA: Product = {
  id: 'prod-1',
  sku: 'KA-01-JKT',
  name: 'Tactical Modular Shell Jacket',
  category: 'outerwear',
  categoryLabel: 'Outerwear',
  priceUSD: 480,
  image: '/test.jpg',
  description: 'Test description',
  composition: '100% 3L Nylon',
  fit: 'Oversized',
  sizes: ['S', 'M', 'L', 'XL'],
  stockCount: 12,
  drop: 'Drop 01',
  specs: ['Waterproof', 'Taped seams'],
};

const mockProductB: Product = {
  id: 'prod-2',
  sku: 'KA-02-ACC',
  name: 'Monolith Ballistic Tote',
  category: 'accessories',
  categoryLabel: 'Accessories',
  priceUSD: 190,
  image: '/test2.jpg',
  description: 'Test tote',
  composition: 'Cordura',
  fit: 'One Size',
  sizes: ['ONE SIZE'],
  stockCount: 20,
  drop: 'Drop 01',
  specs: ['1680D Ballistic'],
};

test('calculateSubtotalUSD sums item prices correctly with quantities', () => {
  const items: CartItem[] = [
    { productId: 'prod-1', product: mockProductA, size: 'L', quantity: 1 },
    { productId: 'prod-2', product: mockProductB, size: 'ONE SIZE', quantity: 2 },
  ];
  // 480 * 1 + 190 * 2 = 480 + 380 = 860
  assert.equal(calculateSubtotalUSD(items), 860);
});

test('calculateSubtotalUSD returns 0 for empty cart', () => {
  assert.equal(calculateSubtotalUSD([]), 0);
});

test('calculateDiscountUSD applies DROP01 promo code (10%)', () => {
  const result = calculateDiscountUSD(500, 'DROP01');
  assert.equal(result.isValid, true);
  assert.equal(result.discountAmount, 50);
  assert.equal(result.percentage, 10);
});

test('calculateDiscountUSD rejects invalid code', () => {
  const result = calculateDiscountUSD(500, 'FAKECODE');
  assert.equal(result.isValid, false);
  assert.equal(result.discountAmount, 0);
});

test('calculateShippingUSD computes free shipping over threshold', () => {
  assert.equal(calculateShippingUSD(FREE_SHIPPING_THRESHOLD_USD), 0);
  assert.equal(calculateShippingUSD(300), 0);
  assert.equal(calculateShippingUSD(150), 25);
  assert.equal(calculateShippingUSD(0), 0);
});

test('calculateTotalUSD combines subtotal, discount, and shipping', () => {
  // 200 subtotal, 20 discount, 25 shipping = 205
  assert.equal(calculateTotalUSD(200, 20, 25), 205);
});

test('convertPrice and formatPrice format correctly across currencies', () => {
  assert.equal(convertPrice(100, 'USD'), 100);
  assert.equal(convertPrice(100, 'EUR'), 92);
  assert.equal(formatPrice(100, 'USD'), '$100');
  assert.equal(formatPrice(100, 'GBP'), '£79');
});

test('validateEmail validates RFC compliant emails', () => {
  assert.equal(validateEmail('collector@kineticarchive.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('test@domain'), false);
});
