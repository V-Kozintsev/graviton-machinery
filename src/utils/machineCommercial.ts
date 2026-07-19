import type { Machine } from '../types';

export const salesPhoneHref = 'tel:+78005501984';
export const salesEmail = 'sales@graviton-machinery.ru';

const categoryGallery = {
  excavators: ['excavator', 'excavator-2', 'hero'],
  loaders: ['loader', 'loader-2', 'delivery'],
  bulldozers: ['bulldozer', 'bulldozer-2', 'hero'],
  cranes: ['crane', 'crane-2', 'delivery'],
  road: ['road', 'road-2', 'delivery'],
  skid: ['skid', 'skid-2', 'loader-2'],
} as const;

export function getKeySpecs(machine: Machine, limit = 4) {
  return Object.entries(machine.specs).slice(0, limit);
}

export function getMonthlyLease(price: number | null) {
  if (!price) return null;
  return Math.ceil((price * 0.028) / 1000) * 1000;
}

export function getProductGallery(machine: Machine) {
  return [machine.image, ...categoryGallery[machine.category].filter((image) => image !== machine.image)].slice(0, 3);
}

export function getSalesMailHref(machine: Machine) {
  const subject = encodeURIComponent(`Запрос по технике ${machine.name}`);
  const body = encodeURIComponent(`Здравствуйте. Интересует ${machine.name}, ${machine.sku}. Прошу связаться с отделом продаж.`);
  return `mailto:${salesEmail}?subject=${subject}&body=${body}`;
}
