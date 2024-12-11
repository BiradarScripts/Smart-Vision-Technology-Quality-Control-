// Enable client-side rendering for Next.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BasketItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category?: string;
  brand?: string;
  expiryDate?: string;
  freshnessIndex?: number;
  nutrients?: string;
}

interface BasketContextType {
  basket: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  // Load basket from localStorage when the component mounts
  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket));
    }
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  // Add an item to the basket
  const addToBasket = (item: BasketItem) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((i) => i.id === item.id);
      if (existingItem) {
        return prevBasket.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevBasket, { ...item, quantity: 1 }];
    });
  };

  // Remove an item from the basket by ID
  const removeFromBasket = (id: string) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
  };

  // Clear the entire basket
  const clearBasket = () => {
    setBasket([]);
  };

  // Update the quantity of a specific item
  const updateQuantity = (id: string, quantity: number) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  // Calculate the total price of all items in the basket
  const getTotalPrice = () => {
    return basket.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate the total number of items in the basket
  const getTotalItems = () => {
    return basket.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

// Custom hook to use the Basket context
export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
