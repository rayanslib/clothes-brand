import { Product } from '../types';

export const HERO_IMAGE_PATH = '/images/hero.jpg';
export const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80';

export const PRODUCTS: Product[] = [
  {
    id: 'exo-01-jkt',
    sku: 'EXO-01-JKT',
    name: 'Tactical Modular Shell Jacket',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    priceUSD: 480,
    image: '/images/jacket.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    badge: 'DROP 01',
    description:
      'Architectural modular shell engineered from 3-layer bonded microporous nylon. Features magnetic storm flap, taped water-sealed seams, articulated sleeve patterning, and matte anodized zip pulls.',
    composition: '100% Japanese 3-Layer Micro-Ripstop Nylon with DWR Coating',
    fit: 'Boxy architectural cut with dropped shoulders. True to size for intentional layering.',
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 14,
    drop: 'DROP 01 // EQUILIBRIUM',
    specs: [
      '20,000mm Waterproof Hydrostatic Head',
      'Laser-cut underarm ventilation apertures',
      'Concealed magnetic storm closure',
      'Internal dual sling strap system',
    ],
  },
  {
    id: 'exo-02-btm',
    sku: 'EXO-02-BTM',
    name: 'Articulated Heavy Twill Cargo',
    category: 'bottoms',
    categoryLabel: 'Bottoms',
    priceUSD: 320,
    image: '/images/cargo.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    badge: 'ARCHIVAL',
    description:
      'Constructed from custom-developed 460GSM washed carbon twill. Engineered with triple-pleated knee articulation for fluid movement and ergonomic geometric cargo pockets.',
    composition: '100% Heavyweight Japanese Cotton Twill (460GSM)',
    fit: 'Relaxed taper with adjustable elasticated toggle cuffs and integrated webbing belt.',
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 19,
    drop: 'DROP 01 // EQUILIBRIUM',
    specs: [
      'Triple-pleated articulated knee ergonomics',
      'Integrated nylon web belt with magnetic release',
      'Concealed zipped passport pocket',
      'Reinforced gusseted seat construction',
    ],
  },
  {
    id: 'exo-03-sweat',
    sku: 'EXO-03-SWEAT',
    name: '520GSM Oversized Boxy Hoodie',
    category: 'sweats',
    categoryLabel: 'Sweatshirts',
    priceUSD: 240,
    image: '/images/hoodie.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    badge: 'CORE ARCHIVE',
    description:
      'The definitive luxury heavyweight silhouette. Spun from ultra-dense 520GSM combed loopback French terry with a seamless double-layered hood and blind-stitched kangaroo pocket.',
    composition: '100% Combed Organic Loopback Cotton (520GSM)',
    fit: 'Exaggerated boxy torso, dropped shoulders, slightly cropped waist ribbing.',
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 22,
    drop: 'DROP 01 // EQUILIBRIUM',
    specs: [
      'Pre-shrunk vintage carbon wash',
      'Double-layer sculptural hood without drawstrings',
      'Seamless side construction',
      'Thick 2x2 ribbing at cuffs and hem',
    ],
  },
  {
    id: 'exo-04-acc',
    sku: 'EXO-04-ACC',
    name: 'Monolith Ballistic Tote',
    category: 'accessories',
    categoryLabel: 'Accessories',
    priceUSD: 190,
    image: '/images/tote.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    badge: 'LIMITED RUN',
    description:
      'Structured modular daily monolith built from water-resistant 1680D ballistic nylon. Features aerospace aluminum hardware, tactical webbing grid, and padded interior device sleeve.',
    composition: '1680D Ballistic Cordura Nylon & Full-Grain Italian Trim',
    fit: 'Monolithic structured silhouette (24L capacity)',
    sizes: ['ONE SIZE'],
    stockCount: 27,
    drop: 'DROP 01 // EQUILIBRIUM',
    specs: [
      'Padded 16" MacBook compartment',
      'Aerospace anodized aluminium hardware',
      'Detachable seatbelt webbing shoulder harness',
      'Internal key tether with carabiner',
    ],
  },
];
