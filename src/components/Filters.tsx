import { X } from 'lucide-react';
import { availabilities, categories, conditions, makers } from '../data/catalog';
import type { CategorySlug } from '../types';

export type FiltersValue = { category: string; maker: string; condition: string; availability: string; maxPrice: number };

export const initialFilters: FiltersValue = { category: '', maker: '', condition: '', availability: '', maxPrice: 22000000 };

export function Filters({ value, onChange, onReset, mobile = false }: { value: FiltersValue; onChange: (value: FiltersValue) => void; onReset: () => void; mobile?: boolean }) {
  const update = (patch: Partial<FiltersValue>) => onChange({ ...value, ...patch });
  return (
    <div className={mobile ? 'filters mobile-filters' : 'filters'}>
      <div className="filters-title">
        <strong>Фильтры</strong>
        <button className="text-button" onClick={onReset}><X size={16} /> Сбросить</button>
      </div>
      <label>Категория
        <select value={value.category} onChange={(event) => update({ category: event.target.value })}>
          <option value="">Все категории</option>
          {Object.entries(categories).map(([key, item]) => <option key={key} value={key}>{item.title}</option>)}
        </select>
      </label>
      <label>Производитель
        <select value={value.maker} onChange={(event) => update({ maker: event.target.value })}>
          <option value="">Все производители</option>
          {makers.map((maker) => <option key={maker}>{maker}</option>)}
        </select>
      </label>
      <fieldset>
        <legend>Состояние</legend>
        {conditions.map((condition) => (
          <label className="check" key={condition}>
            <input type="checkbox" checked={value.condition === condition} onChange={() => update({ condition: value.condition === condition ? '' : condition })} />
            <span>{condition}</span>
          </label>
        ))}
      </fieldset>
      <label>Наличие
        <select value={value.availability} onChange={(event) => update({ availability: event.target.value })}>
          <option value="">Любой статус</option>
          {availabilities.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label>Цена до {new Intl.NumberFormat('ru-RU').format(value.maxPrice)} ₽
        <input type="range" min="4000000" max="22000000" step="500000" value={value.maxPrice} onChange={(event) => update({ maxPrice: Number(event.target.value) })} />
      </label>
    </div>
  );
}

export function activeFilterLabels(value: FiltersValue) {
  return [
    value.category && categories[value.category as CategorySlug].title,
    value.maker,
    value.condition,
    value.availability,
    value.maxPrice < initialFilters.maxPrice && `до ${new Intl.NumberFormat('ru-RU').format(value.maxPrice)} ₽`,
  ].filter(Boolean) as string[];
}
