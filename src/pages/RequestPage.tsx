import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { MachineImage } from '../components/Image';
import { getMachine } from '../data/catalog';
import { requestSchema, type RequestFormData } from '../schemas/requestSchema';
import { useRequest } from '../state/RequestContext';
import { formatPrice } from '../utils/format';

export function RequestPage({ forceErrors = false, forceSuccess = false }: { forceErrors?: boolean; forceSuccess?: boolean }) {
  const request = useRequest();
  const [success, setSuccess] = useState(false);
  const machines = request.items.map((item) => ({ item, machine: getMachine(item.slug) })).filter((entry) => entry.machine);
  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: forceErrors ? '' : '', phone: '', company: '', email: '', comment: '', agreement: false },
  });

  const submit = form.handleSubmit(() => {
    setSuccess(true);
    request.clear();
  });

  if (success || forceSuccess) {
    return (
      <section className="page-section success-screen">
        <div className="container narrow">
          <CheckCircle size={54} />
          <h1>Демонстрационная заявка оформлена</h1>
          <p>Данные не отправлялись на сервер. Это экран успешного завершения сценария для портфолио-проекта GRAVITON.</p>
          <Link className="btn btn-primary" to="/catalog">Вернуться в каталог</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-title"><div><span className="eyebrow">Заявка</span><h1>Выбранная техника</h1></div><p>{request.count} позиций</p></div>
        <div className="request-grid">
          <div className="request-list">
            {machines.length ? machines.map(({ item, machine }) => machine && (
              <article className="request-item" key={machine.slug}>
                <MachineImage name={machine.image} alt={machine.alt} className="cover" />
                <div>
                  <Link to={`/catalog/${machine.slug}`}><h2>{machine.name}</h2></Link>
                  <p>{machine.sku} · {formatPrice(machine.price)}</p>
                  <div className="qty">
                    <button onClick={() => request.setQuantity(machine.slug, item.quantity - 1)} aria-label="Уменьшить количество"><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => request.setQuantity(machine.slug, item.quantity + 1)} aria-label="Увеличить количество"><Plus size={16} /></button>
                    <button onClick={() => request.remove(machine.slug)} aria-label="Удалить позицию"><Trash2 size={16} /></button>
                  </div>
                </div>
              </article>
            )) : (
              <div className="empty-state">
                <h2>В заявке пока нет техники</h2>
                <p>Добавьте одну или несколько машин из каталога, чтобы запрос выглядел предметно.</p>
                <Link className="btn btn-primary" to="/catalog">Перейти в каталог</Link>
              </div>
            )}
            {machines.length > 0 && <button className="text-button danger" onClick={request.clear}>Очистить заявку</button>}
          </div>
          <form className="form-panel" onSubmit={submit} noValidate>
            <h2>Контактные данные</h2>
            <Field label="Имя" error={form.formState.errors.name?.message}><input {...form.register('name')} /></Field>
            <Field label="Телефон" error={form.formState.errors.phone?.message}><input {...form.register('phone')} placeholder="+7 900 000-00-00" /></Field>
            <Field label="Компания" error={form.formState.errors.company?.message}><input {...form.register('company')} /></Field>
            <Field label="Электронная почта" error={form.formState.errors.email?.message}><input {...form.register('email')} /></Field>
            <Field label="Комментарий" error={form.formState.errors.comment?.message}><textarea {...form.register('comment')} rows={4} placeholder="Объект, сроки, предпочтительная комплектация" /></Field>
            <label className="check agreement"><input type="checkbox" {...form.register('agreement')} /><span>Согласен на обработку данных для подготовки коммерческого предложения</span></label>
            {form.formState.errors.agreement?.message && <p className="field-error">{form.formState.errors.agreement.message}</p>}
            <Button disabled={!machines.length}>Отправить заявку на расчет</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}{error && <small className="field-error">{error}</small>}</label>;
}
