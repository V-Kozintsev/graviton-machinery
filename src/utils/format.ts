export const formatPrice = (value: number | null) =>
  value ? `${new Intl.NumberFormat('ru-RU').format(value)} ₽` : 'Цена по запросу';

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
