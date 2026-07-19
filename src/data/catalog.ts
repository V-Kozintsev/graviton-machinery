import type { Availability, CategorySlug, Condition, Machine } from '../types';

export const categories: Record<CategorySlug, { title: string; description: string; image: string }> = {
  excavators: { title: 'Экскаваторы', description: 'Гусеничные и колесные машины для земляных работ.', image: 'excavator' },
  loaders: { title: 'Фронтальные погрузчики', description: 'Погрузка инертных материалов и работа на складах.', image: 'loader' },
  bulldozers: { title: 'Бульдозеры', description: 'Планировка, разработка грунта и подготовка площадок.', image: 'bulldozer' },
  cranes: { title: 'Автокраны', description: 'Подъемные работы на строительных и промышленных объектах.', image: 'crane' },
  road: { title: 'Дорожная техника', description: 'Катки, грейдеры и асфальтоукладчики.', image: 'road' },
  skid: { title: 'Мини-погрузчики', description: 'Компактная техника для городских и складских работ.', image: 'skid' },
};

const common = {
  excavator: { image: 'excavator', alt: 'Экскаватор на нейтральной строительной площадке' },
  loader: { image: 'loader', alt: 'Фронтальный погрузчик на складе щебня' },
  bulldozer: { image: 'bulldozer', alt: 'Бульдозер с широким отвалом на подготовке площадки' },
  crane: { image: 'crane', alt: 'Автокран с телескопической стрелой на промышленном объекте' },
  road: { image: 'road', alt: 'Дорожная техника на асфальтовой площадке' },
  skid: { image: 'skid', alt: 'Мини-погрузчик на городской строительной площадке' },
};

type Media = { image: string; alt: string };
type Row = [string, string, CategorySlug, string, string, number, Condition, Availability, number | null, number, Media, Record<string, string>, string[]];

const rows: Row[] = [
  ['atlas-ex-220', 'Atlas EX 220 гусеничный экскаватор', 'excavators', 'Atlas', 'GR-EX-220-24', 2024, 'Новая', 'В наличии', 14800000, 98, common.excavator, { Масса: '22 400 кг', Мощность: '129 кВт', Ковш: '1,1 м³', 'Глубина копания': '6,7 м', Наработка: '12 м/ч' }, ['22,4 т', '1,1 м³', '129 кВт']],
  ['terra-dig-180', 'TerraDig 180 колесный экскаватор', 'excavators', 'TerraDig', 'GR-EX-180-23', 2023, 'После сервиса', 'В пути', 11900000, 86, common.excavator, { Масса: '18 200 кг', Мощность: '112 кВт', Ковш: '0,9 м³', 'Глубина копания': '5,9 м', Наработка: '740 м/ч' }, ['18,2 т', '0,9 м³', '740 м/ч']],
  ['nord-lift-936', 'NordLift 936 фронтальный погрузчик', 'loaders', 'NordLift', 'GR-LD-936-24', 2024, 'Новая', 'В наличии', 9300000, 93, common.loader, { Масса: '10 800 кг', Мощность: '125 кВт', Ковш: '2,1 м³', Грузоподъемность: '3 600 кг', Наработка: '8 м/ч' }, ['2,1 м³', '3,6 т', '125 кВт']],
  ['volmar-l50', 'Volmar L50 фронтальный погрузчик', 'loaders', 'Volmar', 'GR-LD-050-22', 2022, 'С пробегом', 'В наличии', 6200000, 78, common.loader, { Масса: '7 900 кг', Мощность: '92 кВт', Ковш: '1,6 м³', Грузоподъемность: '2 500 кг', Наработка: '1 840 м/ч' }, ['1,6 м³', '2,5 т', '2022 г.']],
  ['dozer-bx-17', 'Dozer BX-17 бульдозер', 'bulldozers', 'DozerWorks', 'GR-BD-017-24', 2024, 'Новая', 'Под заказ', 16700000, 82, common.bulldozer, { Масса: '17 300 кг', Мощность: '140 кВт', Отвал: '4,2 м³', Тяга: '245 кН', Наработка: '0 м/ч' }, ['17,3 т', '4,2 м³', '140 кВт']],
  ['steeltrack-d65', 'SteelTrack D65 бульдозер', 'bulldozers', 'SteelTrack', 'GR-BD-065-21', 2021, 'После сервиса', 'В наличии', 10800000, 75, common.bulldozer, { Масса: '19 600 кг', Мощность: '153 кВт', Отвал: '4,6 м³', Тяга: '265 кН', Наработка: '2 120 м/ч' }, ['19,6 т', '2 120 м/ч', 'рыхлитель']],
  ['cranex-35', 'CraneX 35 автокран', 'cranes', 'CraneX', 'GR-CR-035-24', 2024, 'Новая', 'В наличии', 21400000, 88, common.crane, { Грузоподъемность: '35 т', Стрела: '39 м', Шасси: '6x4', Мощность: '213 кВт', Наработка: '20 м/ч' }, ['35 т', '39 м', '6x4']],
  ['cranex-50', 'CraneX 50 автокран', 'cranes', 'CraneX', 'GR-CR-050-22', 2022, 'С пробегом', 'Под заказ', null, 69, common.crane, { Грузоподъемность: '50 т', Стрела: '45 м', Шасси: '8x4', Мощность: '276 кВт', Наработка: '1 360 м/ч' }, ['50 т', '45 м', 'цена по запросу']],
  ['roadpro-r12', 'RoadPro R12 виброкаток', 'road', 'RoadPro', 'GR-RD-012-23', 2023, 'После сервиса', 'В наличии', 7400000, 84, common.road, { Масса: '12 000 кг', Мощность: '98 кВт', Валец: '2 130 мм', Частота: '31 Гц', Наработка: '920 м/ч' }, ['12 т', '2 130 мм', '920 м/ч']],
  ['gradepro-140', 'GradePro 140 автогрейдер', 'road', 'RoadPro', 'GR-RD-140-24', 2024, 'Новая', 'В пути', 18200000, 72, common.road, { Масса: '15 400 кг', Мощность: '138 кВт', Отвал: '3 660 мм', Рыхлитель: '5 зубьев', Наработка: '16 м/ч' }, ['15,4 т', '3 660 мм', '138 кВт']],
  ['compact-sk650', 'Compact SK650 мини-погрузчик', 'skid', 'Compact', 'GR-SK-650-24', 2024, 'Новая', 'В наличии', 5100000, 91, common.skid, { Масса: '3 200 кг', Мощность: '55 кВт', Ковш: '0,45 м³', Грузоподъемность: '950 кг', Наработка: '5 м/ч' }, ['950 кг', '0,45 м³', '55 кВт']],
  ['compact-sk900', 'Compact SK900 мини-погрузчик', 'skid', 'Compact', 'GR-SK-900-22', 2022, 'С пробегом', 'В наличии', 3900000, 73, common.skid, { Масса: '3 850 кг', Мощность: '63 кВт', Ковш: '0,55 м³', Грузоподъемность: '1 180 кг', Наработка: '1 420 м/ч' }, ['1 180 кг', '2022 г.', '1 420 м/ч']],
];

export const catalog: Machine[] = rows.map(([slug, name, category, maker, sku, year, condition, availability, price, popular, media, specs, highlights]) => ({
  slug,
  name,
  category,
  maker,
  sku,
  year,
  condition,
  availability,
  price,
  popular,
  image: media.image,
  alt: media.alt,
  specs,
  highlights,
  description: 'Техника подготовлена к осмотру, поставляется с предпродажной диагностикой, сервисной картой и комплектом документов.',
  equipment: ['кабина с отопителем', 'LED-освещение', 'сервисная карта', 'комплект фильтров'],
}));

export const makers = Array.from(new Set(catalog.map((item) => item.maker))).sort();
export const conditions = Array.from(new Set(catalog.map((item) => item.condition)));
export const availabilities = Array.from(new Set(catalog.map((item) => item.availability)));
export const getMachine = (slug: string) => catalog.find((item) => item.slug === slug);
