export type CategorySlug = 'excavators' | 'loaders' | 'bulldozers' | 'cranes' | 'road' | 'skid';
export type Availability = 'В наличии' | 'Под заказ' | 'В пути';
export type Condition = 'Новая' | 'С пробегом' | 'После сервиса';

export type Machine = {
  slug: string;
  name: string;
  category: CategorySlug;
  maker: string;
  sku: string;
  year: number;
  condition: Condition;
  availability: Availability;
  price: number | null;
  popular: number;
  image: string;
  alt: string;
  specs: Record<string, string>;
  highlights: string[];
  description: string;
  equipment: string[];
};

export type RequestItem = { slug: string; quantity: number };
