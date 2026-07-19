import { SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters, activeFilterLabels, initialFilters } from '../components/Filters';
import type { FiltersValue } from '../components/Filters';
import { MachineCard } from '../components/MachineCard';
import { catalog } from '../data/catalog';
import { useLockBody } from '../hooks/useLockBody';

type Sort = 'popular' | 'cheap' | 'expensive' | 'name';

export function CatalogPage() {
  const [params] = useSearchParams();
  const [filters, setFilters] = useState<FiltersValue>({ ...initialFilters, category: params.get('category') || '' });
  const [sort, setSort] = useState<Sort>('popular');
  const [drawer, setDrawer] = useState(false);
  useLockBody(drawer);

  const result = useMemo(() => {
    const filtered = catalog.filter((item) => {
      const price = item.price ?? initialFilters.maxPrice;
      return (!filters.category || item.category === filters.category) &&
        (!filters.maker || item.maker === filters.maker) &&
        (!filters.condition || item.condition === filters.condition) &&
        (!filters.availability || item.availability === filters.availability) &&
        price <= filters.maxPrice;
    });
    return filtered.sort((a, b) => {
      if (sort === 'cheap') return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (sort === 'expensive') return (b.price ?? 0) - (a.price ?? 0);
      if (sort === 'name') return a.name.localeCompare(b.name, 'ru');
      return b.popular - a.popular;
    });
  }, [filters, sort]);

  const reset = () => setFilters(initialFilters);
  const labels = activeFilterLabels(filters);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-title">
          <div><span className="eyebrow">Каталог</span><h1>Строительная техника GRAVITON</h1></div>
          <p>{result.length} позиций найдено</p>
        </div>
        <div className="catalog-layout">
          <aside className="desktop-filter"><Filters value={filters} onChange={setFilters} onReset={reset} /></aside>
          <div>
            <div className="catalog-toolbar">
              <button className="btn btn-secondary mobile-filter-button" onClick={() => setDrawer(true)}><SlidersHorizontal size={18} /> Фильтры</button>
              <div className="chips">
                {labels.map((label) => <span key={label}>{label}</span>)}
                {labels.length > 0 && <button onClick={reset}>Сбросить</button>}
              </div>
              <label className="sort">Сортировка
                <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
                  <option value="popular">по популярности</option>
                  <option value="cheap">сначала дешевле</option>
                  <option value="expensive">сначала дороже</option>
                  <option value="name">по названию</option>
                </select>
              </label>
            </div>
            {result.length ? <div className="catalog-grid">{result.map((machine) => <MachineCard key={machine.slug} machine={machine} />)}</div> : <div className="empty-state"><h2>Ничего не найдено</h2><p>Попробуйте убрать часть фильтров или расширить диапазон цены.</p><button className="btn btn-primary" onClick={reset}>Сбросить фильтры</button></div>}
          </div>
        </div>
      </div>
      {drawer && (
        <div className="overlay" onMouseDown={() => setDrawer(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="filters-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-head"><h2 id="filters-title">Фильтры каталога</h2><button className="icon-button" onClick={() => setDrawer(false)} aria-label="Закрыть фильтры"><X size={22} /></button></div>
            <Filters value={filters} onChange={setFilters} onReset={reset} mobile />
          </aside>
        </div>
      )}
    </section>
  );
}
