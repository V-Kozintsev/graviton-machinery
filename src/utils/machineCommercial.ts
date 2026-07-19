import type { Machine } from '../types';

export const salesPhoneHref = 'tel:+78005501984';
export const salesEmail = 'sales@graviton-machinery.ru';

export function getKeySpecs(machine: Machine, limit = 4) {
  return Object.entries(machine.specs).slice(0, limit);
}

export function getSalesMailHref(machine: Machine) {
  const subject = encodeURIComponent(`Запрос по технике ${machine.name}`);
  const body = encodeURIComponent(`Здравствуйте. Интересует ${machine.name}, ${machine.sku}. Прошу связаться с отделом продаж.`);
  return `mailto:${salesEmail}?subject=${subject}&body=${body}`;
}
