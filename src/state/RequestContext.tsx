import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { RequestItem } from '../types';

type RequestContextValue = {
  items: RequestItem[];
  count: number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

const STORAGE_KEY = 'graviton-request';
const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RequestItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as RequestItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<RequestContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: (slug) =>
      setItems((current) => {
        const existing = current.find((item) => item.slug === slug);
        if (existing) return current.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item));
        return [...current, { slug, quantity: 1 }];
      }),
    remove: (slug) => setItems((current) => current.filter((item) => item.slug !== slug)),
    setQuantity: (slug, quantity) => setItems((current) => current.map((item) => (item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item))),
    clear: () => setItems([]),
    has: (slug) => items.some((item) => item.slug === slug),
  }), [items]);

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
}

export function useRequest() {
  const context = useContext(RequestContext);
  if (!context) throw new Error('useRequest must be used inside RequestProvider');
  return context;
}
