import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, CalendarDays, Check, ClipboardList, Mail, PhoneCall, Plus, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { MachineImage } from '../components/Image';
import { MachineCard } from '../components/MachineCard';
import { catalog, categories, getMachine } from '../data/catalog';
import { useRequest } from '../state/RequestContext';
import { formatPrice } from '../utils/format';
import { getKeySpecs, getMonthlyLease, getSalesMailHref, salesPhoneHref } from '../utils/machineCommercial';

export function ProductPage() {
  const { slug = '' } = useParams();
  const machine = getMachine(slug);
  const request = useRequest();
  const [selected, setSelected] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    setSelected(0);
    embla?.scrollTo(0, true);
  }, [embla, slug]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    onSelect();
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  if (!machine) return <Navigate to="/404" replace />;
  const similar = catalog.filter((item) => item.category === machine.category && item.slug !== machine.slug).slice(0, 3);
  const gallery = [machine.image, machine.image, machine.image];
  const added = request.has(machine.slug);
  const keySpecs = getKeySpecs(machine, 6);
  const lease = getMonthlyLease(machine.price);

  return (
    <section className="page-section">
      <div className="container">
        <Link className="back-link" to="/catalog"><ArrowLeft size={18} /> Назад в каталог</Link>
        <div className="product-grid">
          <div>
            <div className="embla" ref={emblaRef} tabIndex={0} onKeyDown={(event) => {
              if (event.key === 'ArrowRight') embla?.scrollNext();
              if (event.key === 'ArrowLeft') embla?.scrollPrev();
            }}>
              <div className="embla-track">
                {gallery.map((image, index) => <div className="embla-slide" key={`${image}-${index}`}><MachineImage name={image} alt={`${machine.alt}, фото ${index + 1}`} className="cover" priority={index === 0} /></div>)}
              </div>
            </div>
            <div className="thumbs">{gallery.map((image, index) => <button key={index} className={selected === index ? 'active' : ''} onClick={() => embla?.scrollTo(index)}><MachineImage name={image} alt="" className="cover" /></button>)}</div>
          </div>
          <div className="product-info">
            <span className="eyebrow">{categories[machine.category].title} · {machine.sku}</span>
            <h1>{machine.name}</h1>
            <div className="product-commercial">
              <span><ClipboardList size={16} /> {machine.sku}</span>
              <span><CalendarDays size={16} /> {machine.year} год</span>
              <span><ShieldCheck size={16} /> {machine.condition}</span>
              <span>{machine.availability}</span>
            </div>
            <div className="product-offer">
              <div>
                {machine.price ? <span className="old-price">{formatPrice(Math.round(machine.price * 1.06))}</span> : null}
                <strong className="product-price">{formatPrice(machine.price)}</strong>
              </div>
              <div className="lease-box">
                <span>Лизинг от</span>
                <strong>{lease ? `${formatPrice(lease)} / мес` : 'по запросу'}</strong>
              </div>
            </div>
            <div className="product-spec-grid">
              {keySpecs.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="product-actions">
              <Button onClick={() => request.add(machine.slug)} variant={added ? 'secondary' : 'primary'}>{added ? <Check size={18} /> : <Plus size={18} />} {added ? 'Добавлено в заявку' : 'Добавить в заявку'}</Button>
              <a className="btn btn-secondary" href={getSalesMailHref(machine)}><Mail size={18} /> Написать в продажи</a>
            </div>
            <div className="sales-direct">
              <PhoneCall size={18} />
              <div>
                <strong>Отдел продаж без добавления в заявку</strong>
                <a href={salesPhoneHref}>8 800 550-19-84</a>
              </div>
            </div>
            <p>{machine.description}</p>
            <h2>Технические параметры</h2>
            <table className="spec-table"><tbody>{Object.entries(machine.specs).map(([key, value]) => <tr key={key}><th>{key}</th><td>{value}</td></tr>)}</tbody></table>
            <h2>Комплектация</h2>
            <ul className="check-list">{machine.equipment.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="info-band"><p><strong>Доставка:</strong> трал по РФ, согласование погрузки и страховки.</p><p><strong>Лизинг:</strong> подготовим КП и спецификацию для сделки.</p><p><strong>Гарантия:</strong> 6 месяцев на основные узлы после предпродажной диагностики.</p></div>
          </div>
        </div>
        <section className="section related"><div className="section-head"><h2>Похожие модели</h2></div><div className="catalog-grid">{similar.map((item) => <MachineCard key={item.slug} machine={item} />)}</div></section>
      </div>
    </section>
  );
}
