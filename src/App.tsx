import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Manifesto } from './components/Manifesto';
import { Lookbook } from './components/Lookbook';
import { Newsletter } from './components/Newsletter';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Currency } from './types';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinetic_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Initial default seed item for immediate portfolio showcase feel
    return [
      {
        productId: PRODUCTS[0].id,
        product: PRODUCTS[0],
        size: 'L',
        quantity: 1,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [checkoutState, setCheckoutState] = useState<{
    isOpen: boolean;
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    promo: string;
  }>({
    isOpen: false,
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    promo: '',
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kinetic_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleQuickAdd = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { productId: product.id, product, size, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to bag.`);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
    showToast('Item removed from bag.');
  };

  const handleOpenCheckout = (
    subtotal: number,
    discount: number,
    shipping: number,
    total: number,
    promo: string
  ) => {
    setIsCartOpen(false);
    setCheckoutState({
      isOpen: true,
      subtotal,
      discount,
      shipping,
      total,
      promo,
    });
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    showToast('Order confirmed. Dispatch preparation underway.');
  };

  const handleDownloadSingleHtml = () => {
    const link = document.createElement('a');
    link.href = '/kinetic-archive.html';
    link.download = 'kinetic-archive.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloading standalone single-file HTML artifact.');
  };

  const scrollToDrop = () => {
    const el = document.getElementById('drop01');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToManifesto = () => {
    const el = document.getElementById('manifesto');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* 1. Announcement Bar */}
      <AnnouncementBar
        currentCurrency={currency}
        onCurrencyChange={(c) => {
          setCurrency(c);
          showToast(`Currency updated to ${c}`);
        }}
      />

      {/* 2. Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 3. Hero Campaign Banner */}
      <main className="flex-1">
        <Hero onShopDrop={scrollToDrop} onViewManifesto={scrollToManifesto} />

        {/* 4. Featured Product Catalog Grid */}
        <ProductGrid
          products={PRODUCTS}
          currency={currency}
          onQuickAdd={handleQuickAdd}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 5. Brand Manifesto / Aesthetic Split Section */}
        <Manifesto />

        {/* 6. Visual Editorial Lookbook */}
        <Lookbook />

        {/* 7. VIP Access / Private Drop Newsletter */}
        <Newsletter onShowToast={showToast} />
      </main>

      {/* 8. Footer */}
      <Footer
        currentCurrency={currency}
        onCurrencyChange={(c) => {
          setCurrency(c);
          showToast(`Currency updated to ${c}`);
        }}
        onDownloadSingleHtml={handleDownloadSingleHtml}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleOpenCheckout}
      />

      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleQuickAdd}
      />

      <CheckoutModal
        isOpen={checkoutState.isOpen}
        onClose={() => setCheckoutState((prev) => ({ ...prev, isOpen: false }))}
        currency={currency}
        subtotalUSD={checkoutState.subtotal}
        discountUSD={checkoutState.discount}
        shippingUSD={checkoutState.shipping}
        totalUSD={checkoutState.total}
        promoCode={checkoutState.promo}
        onOrderComplete={handleOrderComplete}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}
